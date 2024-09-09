import React, { useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import axios from 'axios';
import Helmet from 'react-helmet';
import {
	IAadhaarData,
	ICasteCertData,
	IDialogs,
	IEwsData,
	IGateScoreData,
	ILicenseData,
	IPanData,
	IPwdData,
	IResponse,
} from '@/types';
import DocumentTable from './DocumentTable';
import DocumentForm from './DocumentForm';

function Ps1652() {
	const [selectedDocType, setSelectedDocType] = useState<string>('aadhaar');
	const [aadhaarData, setAadhaarData] = useState<IAadhaarData>({
		name: null,
		file: null,
		dob: null,
		docno: null,
		gender: null,
	});
	const [panData, setPanData] = useState<IPanData>({
		file: null,
		name: null,
		dob: null,
		docno: null,
		fathername: null,
	});
	const [ewsData, setEwsData] = useState<IEwsData>({
		file: null,
		name: null,
		docno: null,
		certno: null,
		dateofissue: null,
		validtill: null,
		income: null,
		caste: null,
		address: null,
		fathername: null,
	});
	const [pwdData, setPwdData] = useState<IPwdData>({
		file: null,
		name: null,
		certno: null,
		dateofissue: null,
		dob: null,
		gender: null,
		regno: null,
		address: null,
		disabilitypercentage: null,
		disabilitytype: null,
		fathername: null,
	});
	const [casteCertData, setCasteCertData] = useState<ICasteCertData>({
		file: null,
		name: null,
		certno: null,
		fathername: null,
		address: null,
		caste: null,
	});
	const [gateScoreData, setGateScoreData] = useState<IGateScoreData>({
		file: null,
		name: null,
		parentname: null,
		regno: null,
		dob: null,
		exampaper: null,
		gatescore: null,
		marks: null,
		air: null,
		validupto: null,
		qualifyingmarks: null,
		caste: null,
	});
	const [licenseData, setLicenseData] = useState<ILicenseData>({
		address: null,
		dlnumber: null,
		dob: null,
		issuingauthority: null,
		name: null,
		parentname: null,
		validupto: null,
		file: null,
	});

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [apiResponse, setApiResponse] = useState<IResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [executionTime, setExecutionTime] = useState<number | null>(null);
	const [dialogs, setDialogs] = useState<IDialogs>({
		dialog1: false,
		dialog2: false,
		dialog3: false,
		errorDialog: false,
	});
	const [showApiResponse, setShowApiResponse] = useState<boolean>(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const clearAllData = () => {
		setLicenseData({
			address: null,
			dlnumber: null,
			dob: null,
			issuingauthority: null,
			name: null,
			parentname: null,
			validupto: null,
			file: null,
		});
		setAadhaarData({
			name: null,
			dob: null,
			docno: null,
			gender: null,
			file: null,
		});
		setPanData({
			file: null,
			name: null,
			dob: null,
			docno: null,
			fathername: null,
		});
		setEwsData({
			name: null,
			file: null,
			docno: null,
			certno: null,
			dateofissue: null,
			validtill: null,
			income: null,
			caste: null,
			address: null,
			fathername: null,
		});
		setPwdData({
			name: null,
			file: null,
			certno: null,
			dateofissue: null,
			dob: null,
			gender: null,
			regno: null,
			address: null,
			disabilitypercentage: null,
			disabilitytype: null,
			fathername: null,
		});
		setCasteCertData({
			name: null,
			file: null,
			certno: null,
			fathername: null,
			address: null,
			caste: null,
		});
		setGateScoreData({
			name: null,
			file: null,
			parentname: null,
			regno: null,
			dob: null,
			exampaper: null,
			gatescore: null,
			marks: null,
			air: null,
			validupto: null,
			qualifyingmarks: null,
			caste: null,
		});
	};

	const handleGenerateOutput = async () => {
		setShowApiResponse(false);

		let file = null;

		switch (selectedDocType) {
			case 'aadhaar':
				file = AadhaarFile!;
				break;
			case 'pan':
				file = PanDataFile!;
				break;
			case 'ews':
				file = EwsFile!;
				break;
			case 'caste':
				file = CasteFile!;
				break;
			case 'gate':
				file = GateFile!;
				break;
			default:
				file = PwdFile!;
				break;
		}

		console.log(file);

		const formData = new FormData();
		formData.append('file', file!);
		formData.append('type', selectedDocType);

		try {
			const response = await axios.post(
				file!.type.includes('image')
					? `${import.meta.env.VITE_BASE_URL}/api/upload/img`
					: `${import.meta.env.VITE_BASE_URL}/api/upload/pdf`,
				formData
			);

			setApiResponse(JSON.parse(response.data.choices[0].message.content));
			console.log(response.data);

			console.info(
				`[GROQ]   Input token      : ${response.data.usage.prompt_tokens}`
			);
			console.info(
				`[GROQ]   Output token     : ${response.data.usage.completion_tokens}`
			);
			console.info(
				`[GROQ]   Total tokens     : ${response.data.usage.total_tokens}`
			);
			console.info(
				`[GROQ]   Total time       : ${response.data.usage.total_time}`
			);
			setExecutionTime(response.data.executiontime);
		} catch (err) {
			console.error(err);
			setError('Error occurred while processing the file. Please try again.');
			setDialogs({ ...dialogs, errorDialog: true });
		}
	};

	const [AadhaarFile, setAadhaarFile] = useState<File | null>(null);
	const [LicenseFile, setLicenseFile] = useState<File | null>(null);
	const [PanDataFile, setPanDataFile] = useState<File | null>(null);
	const [EwsFile, setEwsFile] = useState<File | null>(null);
	const [PwdFile, setPwdFile] = useState<File | null>(null);
	const [CasteFile, setCasteFile] = useState<File | null>(null);
	const [GateFile, setGateFile] = useState<File | null>(null);

	const handleClearOutput = () => {
		clearAllData();
		setSelectedFile(null);
		setApiResponse(null);
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const documentInputs: {
		aadhaar: JSX.Element;
		pan: JSX.Element;
		ews: JSX.Element;
		pwd: JSX.Element;
		caste: JSX.Element;
		gate: JSX.Element;
	} = {
		aadhaar: (
			<>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Aadhaar Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAadhaarFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Driver's License</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setLicenseFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PAN Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPanDataFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>EWS Certicate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEwsFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PWD Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPwdFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Caste Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCasteFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>GATE Scorecard</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setGateFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
			</>
		),
		pan: (
			<>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PAN Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPanDataFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Aadhaar Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAadhaarFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Driver's License</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setLicenseFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>EWS Certicate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEwsFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PWD Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPwdFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Caste Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCasteFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>GATE Scorecard</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setGateFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
			</>
		),
		ews: (
			<>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>EWS Certicate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEwsFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PAN Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPanDataFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Aadhaar Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAadhaarFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Driver's License</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setLicenseFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PWD Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPwdFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Caste Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCasteFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>GATE Scorecard</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setGateFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
			</>
		),
		pwd: (
			<>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PWD Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPwdFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PAN Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPanDataFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Aadhaar Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAadhaarFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Driver's License</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setLicenseFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>EWS Certicate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEwsFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Caste Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCasteFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>GATE Scorecard</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setGateFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
			</>
		),
		caste: (
			<>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Caste Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCasteFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PAN Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPanDataFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Aadhaar Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAadhaarFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Driver's License</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setLicenseFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>EWS Certicate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEwsFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PWD Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPwdFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>GATE Scorecard</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setGateFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
			</>
		),
		gate: (
			<>
				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>GATE Scorecard</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setGateFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PAN Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPanDataFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Aadhaar Card</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAadhaarFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Driver's License</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setLicenseFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>EWS Certicate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEwsFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>PWD Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPwdFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='font-2xl'>Caste Certificate</span>
					<Input
						type='file'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCasteFile(e.target.files![0]);
						}}
						accept='image/*, application/pdf'
					/>
				</div>
			</>
		),
	};

	const RenderForm = () => {
		switch (selectedDocType) {
			case 'aadhaar':
				return documentInputs.aadhaar;
			case 'pan':
				return documentInputs.pan;
			case 'ews':
				return documentInputs.ews;
			case 'caste':
				return documentInputs.caste;
			case 'gate':
				return documentInputs.gate;
			default:
				return documentInputs.pwd;
		}
	};

	return (
		<>
			<div className='container max-w-[95vh] mx-auto flex flex-col justify-center items-center px-5'>
				<Helmet>
					<title>haKDit | PS1652</title>
				</Helmet>
				<div className='w-full py-4 border rounded flex flex-col md:flex-row justify-evenly items-center gap-5'>
					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div className='bg-blue-600 size-5 rounded-full' />
						<p
							className='underline text-blue-400 cursor-pointer'
							onClick={() => setDialogs({ ...dialogs, dialog1: true })}
						>
							Select document
						</p>
					</div>
					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div className='bg-blue-600 size-5 rounded-full' />
						<p
							onClick={() => setDialogs({ ...dialogs, dialog2: true })}
							className='underline text-blue-400 cursor-pointer'
						>
							Enter data
						</p>
					</div>

					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div className='bg-blue-600 size-5 rounded-full' />
						<p
							onClick={() => setShowApiResponse(true)}
							className='underline text-blue-400 cursor-pointer'
						>
							Validate
						</p>
					</div>
				</div>
				{showApiResponse && apiResponse !== null && (
					<pre className='w-full my-5 overflow-y-auto'>
						{JSON.stringify(apiResponse, null, 2)}
					</pre>
				)}
				{showApiResponse && apiResponse !== null && (
					<>
						<DocumentTable
							apiResponse={apiResponse}
							type={selectedDocType}
							aadhaarData={aadhaarData}
							panData={panData}
							ewsData={ewsData}
							pwdData={pwdData}
							casteCertData={casteCertData}
							gateScoreData={gateScoreData}
							licenseData={licenseData}
						/>
					</>
				)}
			</div>

			{/* STEP 1 DIALOG */}
			<Dialog
				open={dialogs.dialog1}
				onOpenChange={(open) => setDialogs({ ...dialogs, dialog1: open })}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select document</DialogTitle>
					</DialogHeader>
					<DialogDescription className='flex flex-col gap-3'>
						<Select
							defaultValue='AadhaarCard'
							value={selectedDocType}
							onValueChange={(value) => {
								setSelectedDocType(value);
							}}
							required
						>
							<SelectTrigger>
								<SelectValue placeholder='Select document type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='aadhaar'>Aadhaar card</SelectItem>
								<SelectItem value='pan'>PAN card</SelectItem>
								<SelectItem value='ews'>EWS certificate</SelectItem>
								<SelectItem value='pwd'>PWD certificate</SelectItem>
								<SelectItem value='caste'>Caste certificate</SelectItem>
								<SelectItem value='gate'>GATE scorecard</SelectItem>
								<SelectItem value='generic'></SelectItem>
							</SelectContent>
						</Select>
						<RenderForm />
					</DialogDescription>
					<DialogFooter>
						<Button
							onClick={() => {
								setDialogs({ ...dialogs, dialog1: false });
								handleGenerateOutput();
							}}
						>
							Confirm selection
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* STEP 2 DIALOG */}
			<Dialog
				open={dialogs.dialog2}
				onOpenChange={(open) => setDialogs({ ...dialogs, dialog2: open })}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Enter your data</DialogTitle>
					</DialogHeader>
					<DialogDescription className='flex flex-col gap-3'>
						<DocumentForm
							aadhaarData={aadhaarData}
							setAadhaarData={setAadhaarData}
							panData={panData}
							setPanData={setPanData}
							ewsData={ewsData}
							setEwsData={setEwsData}
							pwdData={pwdData}
							setPwdData={setPwdData}
							casteCertData={casteCertData}
							setCasteCertData={setCasteCertData}
							gateScoreData={gateScoreData}
							setGateScoreData={setGateScoreData}
							licenseData={licenseData}
							setLicenseData={setLicenseData}
							type={selectedDocType}
						/>
					</DialogDescription>
					<DialogFooter className='flex flex-col md:flex-row gap-2'>
						<Button onClick={handleClearOutput}>Clear</Button>
						<Button
							onClick={() => {
								setDialogs({ ...dialogs, dialog2: false });
							}}
						>
							Submit
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* ERROR DIALOG */}
			<Dialog
				open={dialogs.errorDialog}
				onOpenChange={(open) => setDialogs({ ...dialogs, errorDialog: open })}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Error</DialogTitle>
					</DialogHeader>
					<DialogDescription>{error}</DialogDescription>
					<DialogFooter>
						<Button
							onClick={() => {
								setDialogs({ ...dialogs, errorDialog: false });
								setError(null);
							}}
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default Ps1652;

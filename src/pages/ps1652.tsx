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
	const [dialogs, setDialogs] = useState<IDialogs>({
		dialog1: false,
		dialog2: false,
		dialog3: false,
		errorDialog: false,
	});

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
        setApiResponse(null)

		const formData = new FormData();
		formData.append('file', selectedFile!);
		formData.append('type', selectedDocType);

		try {
			const response = await axios.post(
				selectedFile!.type.includes('image')
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
		} catch (err) {
			console.error(err);
			setError('Error occurred while processing the file. Please try again.');
			setDialogs({ ...dialogs, errorDialog: true });
		}
	};

	const handleClearOutput = () => {
		clearAllData();
		setSelectedFile(null);
		setApiResponse(null);
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
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
						<Button onClick={() => setDialogs({ ...dialogs, dialog1: true })}>
							Select document
						</Button>
					</div>
					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div className='bg-blue-600 size-5 rounded-full' />
						<Button
							onClick={() => setDialogs({ ...dialogs, dialog2: true })}
							disabled={apiResponse === null}
						>
							Enter data
						</Button>
					</div>
				</div>
				{apiResponse !== null && (
					<pre className='w-full my-5 overflow-y-auto'>
						{JSON.stringify(apiResponse, null, 2)}
					</pre>
				)}
				{apiResponse !== null && (
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
				<DialogContent aria-description='select file dialog'>
					<DialogHeader>
						<DialogTitle>Select document</DialogTitle>
					</DialogHeader>
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
					<div className='flex flex-col gap-1'>
						<span className='font-2xl'>
							Document: {selectedDocType.toUpperCase()}
						</span>
						<Input
							type='file'
							ref={fileInputRef}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSelectedFile(e.target.files![0]);
								fileInputRef.current!.value = e.target.files![0].name;
							}}
							accept='image/*, application/pdf'
						/>
					</div>
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
				<DialogContent aria-description='enter data dialog'>
					<DialogHeader>
						<DialogTitle>Enter your data</DialogTitle>
					</DialogHeader>
					<DocumentForm
						apiResponse={apiResponse!}
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
						type={selectedDocType}
					/>
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
				<DialogContent aria-describedby='error dialog'>
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

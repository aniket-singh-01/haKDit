import { useRef, useState } from 'react';
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
		dob: null,
		docno: null,
		gender: null,
	});
	const [panData, setPanData] = useState<IPanData>({
		name: null,
		dob: null,
		docno: null,
		fathername: null,
	});
	const [ewsData, setEwsData] = useState<IEwsData>({
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
		name: null,
		certno: null,
		fathername: null,
		address: null,
		caste: null,
	});
	const [gateScoreData, setGateScoreData] = useState<IGateScoreData>({
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
		setAadhaarData({
			name: null,
			dob: null,
			docno: null,
			gender: null,
		});
		setPanData({
			name: null,
			dob: null,
			docno: null,
			fathername: null,
		});
		setEwsData({
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
		setPwdData({
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
		setCasteCertData({
			name: null,
			certno: null,
			fathername: null,
			address: null,
			caste: null,
		});
		setGateScoreData({
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
	};

	const handleGenerateOutput = async () => {
		setShowApiResponse(false);

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
			console.info(
				`[SERVER] Execution time   : ${response.data.executiontime}`
			);
			setExecutionTime(response.data.executiontime);
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
							setAadhaarData={setAadhaarData}
							setPanData={setPanData}
							setEwsData={setEwsData}
							setPwdData={setPwdData}
							setCasteCertData={setCasteCertData}
							setGateScoreData={setGateScoreData}
						/>
						<span>
							Latest execution time:{' '}
							<span className='font-bold underline'>{executionTime}</span>
							seconds
						</span>
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
						<Input
							type='file'
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSelectedFile(e.target.files![0]);
							}}
							accept='image/*, application/pdf'
						/>
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

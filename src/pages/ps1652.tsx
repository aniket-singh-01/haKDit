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
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
interface IUserData {
	name: string | null;
	documentId: string | null;
	documentType: string | null;
}
interface IDialogs {
	dialog1: boolean;
	dialog2: boolean;
	dialog3: boolean;
	errorDialog: boolean;
}
interface IResponse {
	address: string;
	disabilitypercentage: string;
	disabilitytype: string;
	dob: string;
	docno: string;
	gender: string;
	incomedetails: string;
	language: string;
	name: string;
	otherdata: string;
	subjects: string;
	type: string;
	typematched: boolean;
	executiontime: number;
}

function Ps1652() {
	const [userData, setUserData] = useState<IUserData>({
		name: null,
		documentId: null,
		documentType: null,
	});
	const [dob, setDob] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [apiResponse, setApiResponse] = useState<IResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [dialogs, setDialogs] = useState<IDialogs>({
		dialog1: false,
		dialog2: false,
		dialog3: false,
		errorDialog: false,
	});
	const [showApiResponse, setShowApiResponse] = useState<boolean>(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleGenerateOutput = async () => {
		setShowApiResponse(false);

		const formData = new FormData();
		formData.append('file', selectedFile!);
		formData.append('type', userData.documentType!);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/upload`,
				formData
			);

			setApiResponse(response.data);

			console.log(response.data);
		} catch (err) {
			console.error(err);
			setError('Error occurred while processing the file. Please try again.');
			setDialogs({ ...dialogs, errorDialog: true });
		}
	};

	const handleClearOutput = () => {
		setUserData(() => ({
			name: null,
			documentId: null,
			documentType: null,
			dob: null,
		}));
		setDob('');
		setSelectedFile(null);
		setApiResponse(null);
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const compareData = (orig: string, supp: string): boolean => {
		const processedOrig = orig.toLowerCase().replaceAll(' ', '');
		const processedSupp = supp.toLowerCase().replaceAll(' ', '');
		return processedOrig === processedSupp;
	};

	const renderTableRows = () => {
		const rows = [
			{
				field: 'Name',
				apiValue: apiResponse?.name,
				userValue: userData.name,
				verified: compareData(apiResponse?.name ?? '', userData.name ?? ''),
			},

			...(userData.documentType === 'AadhaarCard'
				? [
						{
							field: 'Aadhaar Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
						{
							field: 'Date of Birth',
							apiValue: apiResponse!.dob,
							userValue: dob,
							verified:
								String(apiResponse!.dob)
									.replaceAll('/', '')
									.replaceAll('-', '') ===
								dob.replaceAll('/', '').replaceAll('-', ''),
						},
				  ]
				: []),
			...(userData.documentType === 'DriversLicense'
				? [
						{
							field: 'License Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
						{
							field: 'Expiry Date',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
				  ]
				: []),
			...(userData.documentType === 'PANCard'
				? [
						{
							field: 'PAN Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
				  ]
				: []),
			...(userData.documentType === 'Marksheet'
				? [
						{
							field: 'Roll Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
						{
							field: 'Institution Name',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
				  ]
				: []),
			...(userData.documentType === 'EWSCertificate'
				? [
						{
							field: 'EWS Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
				  ]
				: []),
			...(userData.documentType === 'PWD_Certificate'
				? [
						{
							field: 'PWD Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
						{
							field: 'Disability Percentage',
							apiValue: apiResponse!.disabilitypercentage,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.disabilitypercentage ?? '',
								userData.documentId ?? ''
							),
						},
				  ]
				: []),
			...(userData.documentType === 'GenericDocument'
				? [
						{
							field: 'PWD Number',
							apiValue: apiResponse!.docno,
							userValue: userData.documentId,
							verified: compareData(
								apiResponse!.docno ?? '',
								userData.documentId ?? ''
							),
						},
				  ]
				: []),
			{
				field: 'Document Type',
				apiValue: apiResponse?.type,
				userValue: userData.documentType,
				verified: apiResponse?.typematched ?? false,
			},
		];
		// Filter rows based on document type
		const filteredRows = rows.filter(() => {
			if (userData.documentType === 'AadhaarCard') return true;
			if (userData.documentType === 'DriversLicense') return true;
			if (userData.documentType === 'PANCard') return true;
			if (userData.documentType === 'Marksheet') return true;
			if (userData.documentType === 'EWSCertificate') return true;
			if (userData.documentType === 'PWD_Certificate') return true;
			if (userData.documentType === 'GenericDocument') return true;
			return false;
		});

		return filteredRows.map((row) => (
			<TableRow key={row.field}>
				<TableCell>{row.field}</TableCell>
				<TableCell>{row.apiValue}</TableCell>
				<TableCell>{row.userValue}</TableCell>
				<TableCell
					className={`font-bold uppercase ${
						row.verified ? 'bg-green-600' : 'bg-red-600'
					}`}
				>
					{row.verified ? 'Yes' : 'No'}
				</TableCell>
			</TableRow>
		));
	};

	return (
		<>
			<div className='container max-w-[95vh] mx-auto flex flex-col justify-center items-center px-5'>
				<Helmet>
					<title>haKDit | PS1652</title>
				</Helmet>
				<div className='w-full py-4 border rounded flex flex-col md:flex-row justify-evenly items-center gap-5'>
					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div
							className={`${
								userData.documentType === null && selectedFile === null
									? 'bg-red-600'
									: 'bg-green-600'
							} size-5 rounded-full`}
						/>
						<p
							className='underline text-blue-400 cursor-pointer'
							onClick={() => setDialogs({ ...dialogs, dialog1: true })}
						>
							Select document
						</p>
					</div>
					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div
							className={`${
								userData.documentId !== null && userData.name !== null
									? 'bg-green-600'
									: 'bg-red-600'
							} size-5 rounded-full`}
						/>
						<p
							onClick={() => setDialogs({ ...dialogs, dialog2: true })}
							className='underline text-blue-400 cursor-pointer'
						>
							Enter data
						</p>
					</div>

					<div className='relative flex flex-1 flex-col items-center justify-center gap-2'>
						<div
							className={`${
								apiResponse === null ? 'bg-red-600' : 'bg-green-600'
							} size-5 rounded-full`}
						/>
						<p
							onClick={() => setShowApiResponse(true)}
							className='underline text-blue-400 cursor-pointer'
						>
							Validate
						</p>
					</div>
				</div>
				{showApiResponse &&
					apiResponse !== null &&
					userData.documentId !== null &&
					userData.documentType !== null &&
					userData.name !== null && (
						<pre className='w-full my-5 overflow-y-auto'>
							{JSON.stringify(apiResponse, null, 2)}
						</pre>
					)}
				{showApiResponse &&
					apiResponse !== null &&
					userData.documentId !== null &&
					userData.documentType !== null &&
					userData.name !== null && (
						<>
							<Table>
								<TableCaption>
									This table shows if the data you entered matches the data in
									the API response
								</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead>Field</TableHead>
										<TableHead>API Response</TableHead>
										<TableHead>Your data</TableHead>
										<TableHead>Verified?</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>{renderTableRows()}</TableBody>
							</Table>
							<span>
								Latest execution time:{' '}
								<span className='font-bold underline'>
									{apiResponse.executiontime}
								</span>{' '}
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
							accept='image/*,.pdf'
						/>
						<Select
							defaultValue='AadhaarCard'
							value={userData.documentType!}
							onValueChange={(value) => {
								setUserData((prev) => ({ ...prev, documentType: value }));
							}}
							required
						>
							<SelectTrigger>
								<SelectValue placeholder='Select document type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='AadhaarCard'>Aadhaar Card</SelectItem>
								<SelectItem value='DriversLicense'>
									Driver&apos;s License
								</SelectItem>
								<SelectItem value='PANCard'>PAN Card</SelectItem>
								<SelectItem value='Marksheet'>Marksheet</SelectItem>
								<SelectItem value='EWSCertificate'>EWS Certificate</SelectItem>
								<SelectItem value='PWD_Certificate'>PWD Certificate</SelectItem>
								<SelectItem value='GenericDocument'>
									Generic Document
								</SelectItem>
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
						<Input
							placeholder='Name'
							value={userData.name ?? ''}
							onChange={(e) =>
								setUserData((prev) => ({ ...prev, name: e.target.value }))
							}
							className='w-full'
						/>
						<Input
							required
							placeholder={"Enter the document number you'd like to verify"}
							value={userData.documentId ?? ''}
							onChange={(e) =>
								setUserData((prev) => ({ ...prev, documentId: e.target.value }))
							}
							className='w-full'
						/>
						<div className='flex justify-between items-center gap-2'>
							<Input
								className='w-full'
								type='text'
								placeholder='Date of birth (DD/MM/YYYY)'
								value={dob}
								onChange={(e) => setDob(e.target.value)}
							/>
						</div>
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

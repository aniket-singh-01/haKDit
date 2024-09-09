import { Input } from '@/components/ui/input'; // Adjust import as needed
import {
	IAadhaarData,
	ICasteCertData,
	IEwsData,
	IGateScoreData,
	IPanData,
	IPwdData,
	IResponse,
} from '@/types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { compareData } from './utils';

interface DocumentFormProps {
	type: string;
	aadhaarData: IAadhaarData;
	panData: IPanData;
	ewsData: IEwsData;
	pwdData: IPwdData;
	casteCertData: ICasteCertData;
	gateScoreData: IGateScoreData;
	setAadhaarData: (data: IAadhaarData) => void;
	setPanData: (data: IPanData) => void;
	setEwsData: (data: IEwsData) => void;
	setPwdData: (data: IPwdData) => void;
	setCasteCertData: (data: ICasteCertData) => void;
	setGateScoreData: (data: IGateScoreData) => void;
	apiResponse: IResponse;
}

const DocumentForm = ({
	apiResponse,
	type,
	aadhaarData,
	panData,
	ewsData,
	pwdData,
	casteCertData,
	gateScoreData,
	setAadhaarData,
	setPanData,
	setEwsData,
	setPwdData,
	setCasteCertData,
	setGateScoreData,
}: DocumentFormProps) => {
	switch (type) {
		case 'aadhaar':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={aadhaarData.name ?? ''}
						onChange={(e) =>
							setAadhaarData({ ...aadhaarData, name: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.name!, aadhaarData.name) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Aadhaar Number'
						value={aadhaarData.docno ?? ''}
						onChange={(e) =>
							setAadhaarData({ ...aadhaarData, docno: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.docno!, aadhaarData.docno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={aadhaarData.dob ?? ''}
						onChange={(e) =>
							setAadhaarData({ ...aadhaarData, dob: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.dob!, aadhaarData.dob) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Select
						value={aadhaarData.gender!}
						onValueChange={(value) => {
							setAadhaarData({ ...aadhaarData, gender: value });
						}}
						defaultValue='male'
					>
						<SelectTrigger
							className={`outline-none ring-0 border ${
								compareData(apiResponse.gender!, aadhaarData.gender) === 'Yes'
									? 'border-green-500'
									: 'border-red-500'
							}`}
						>
							{aadhaarData.gender!}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='male'>Male</SelectItem>
							<SelectItem value='female'>Female</SelectItem>
						</SelectContent>
					</Select>
				</div>
			);

		case 'pan':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={panData.name ?? ''}
						onChange={(e) => setPanData({ ...panData, name: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.name!, panData.name) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='PAN Number'
						value={panData.docno ?? ''}
						onChange={(e) => setPanData({ ...panData, docno: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.docno!, panData.docno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={panData.dob ?? ''}
						onChange={(e) => setPanData({ ...panData, dob: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.dob!, panData.dob) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder="Father's Name"
						value={panData.fathername ?? ''}
						onChange={(e) =>
							setPanData({ ...panData, fathername: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.fathername!, panData.fathername) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
				</div>
			);

		case 'ews':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={ewsData.name ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, name: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.name!, ewsData.name) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Document Number'
						value={ewsData.docno ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, docno: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.docno!, ewsData.docno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Certificate Number'
						value={ewsData.certno ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, certno: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.certno!, ewsData.certno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Date of Issue'
						value={ewsData.dateofissue ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, dateofissue: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.dateofissue!, ewsData.dateofissue) ===
							'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Valid Till'
						value={ewsData.validtill ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, validtill: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.validtill!, ewsData.validtill) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Income'
						value={ewsData.income ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, income: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.income!, ewsData.income) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Caste'
						value={ewsData.caste ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, caste: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.caste!, ewsData.caste) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Address'
						value={ewsData.address ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, address: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.address!, ewsData.address) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder="Father's Name"
						value={ewsData.fathername ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, fathername: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.fathername!, ewsData.fathername) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
				</div>
			);

		case 'pwd':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={pwdData.name ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, name: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.name!, pwdData.name) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Certificate Number'
						value={pwdData.certno ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, certno: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.certno!, pwdData.certno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Date of Issue'
						value={pwdData.dateofissue ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, dateofissue: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.dateofissue!, pwdData.dateofissue) ===
							'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={pwdData.dob ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, dob: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.dob!, pwdData.dob) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Select
						value={pwdData.gender!}
						onValueChange={(value) => {
							setPwdData({ ...pwdData, gender: value });
						}}
					>
						<SelectTrigger
							className={`outline-none ring-0 border ${
								compareData(apiResponse.gender!, pwdData.gender) === 'Yes'
									? 'border-green-500'
									: 'border-red-500'
							}`}
						>
							{pwdData.gender!}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='male'>Male</SelectItem>
							<SelectItem value='female'>Female</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder='Registration Number'
						value={pwdData.regno ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, regno: e.target.value })}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.regno!, pwdData.regno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Address'
						value={pwdData.address ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, address: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.address!, pwdData.address) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Disability Percentage'
						value={pwdData.disabilitypercentage ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, disabilitypercentage: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(
								apiResponse.disabilitypercentage!,
								pwdData.disabilitypercentage
							) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Disability Type'
						value={pwdData.disabilitytype ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, disabilitytype: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(
								apiResponse.disabilitytype!,
								pwdData.disabilitytype
							) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder="Father's Name"
						value={pwdData.fathername ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, fathername: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.fathername!, pwdData.fathername) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
				</div>
			);

		case 'caste':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={casteCertData.name ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, name: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.name!, casteCertData.name) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Certificate Number'
						value={casteCertData.certno ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, certno: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.certno!, casteCertData.certno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder="Father's Name"
						value={casteCertData.fathername ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, fathername: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.fathername!, casteCertData.fathername) ===
							'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Address'
						value={casteCertData.address ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, address: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.address!, casteCertData.address) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Caste'
						value={casteCertData.caste ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, caste: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.caste!, casteCertData.caste) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
				</div>
			);

		case 'gate':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={gateScoreData.name ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, name: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.name!, gateScoreData.name) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder="Parent's Name"
						value={gateScoreData.parentname ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, parentname: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.parentname!, gateScoreData.parentname) ===
							'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Registration Number'
						value={gateScoreData.regno ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, regno: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.regno!, gateScoreData.regno) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={gateScoreData.dob ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, dob: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.dob!, gateScoreData.dob) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Exam Paper'
						value={gateScoreData.exampaper ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, exampaper: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.exampaper!, gateScoreData.exampaper) ===
							'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='GATE Score'
						value={gateScoreData.gatescore ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, gatescore: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.gatescore!, gateScoreData.gatescore) ===
							'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Marks'
						value={gateScoreData.marks ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, marks: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.marks!, gateScoreData.marks) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='AIR'
						value={gateScoreData.air ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, air: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.air!, gateScoreData.air) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Valid Upto'
						value={gateScoreData.validupto ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, validupto: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.validupto!, gateScoreData.caste) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Qualifying Marks'
						value={gateScoreData.qualifyingmarks ?? ''}
						onChange={(e) =>
							setGateScoreData({
								...gateScoreData,
								qualifyingmarks: e.target.value,
							})
						}
						className={`outline-none ring-0 border ${
							compareData(
								apiResponse.qualifyingmarks!,
								gateScoreData.qualifyingmarks
							) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
					<Input
						placeholder='Caste'
						value={gateScoreData.caste ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, caste: e.target.value })
						}
						className={`outline-none ring-0 border ${
							compareData(apiResponse.caste!, gateScoreData.caste) === 'Yes'
								? 'border-green-500'
								: 'border-red-500'
						}`}
					/>
				</div>
			);

		default:
			return <div>Invalid document type</div>;
	}
};

export default DocumentForm;

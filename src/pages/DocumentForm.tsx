// import { Input } from '@/components/ui/input'; // Adjust import as needed
// import {
// 	IAadhaarData,
// 	ICasteCertData,
// 	IEwsData,
// 	IGateScoreData,
// 	IPanData,
// 	IPwdData,
// } from '@/types';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// } from '@/components/ui/select';

// interface DocumentFormProps {
// 	type: string;
// 	aadhaarData: IAadhaarData;
// 	panData: IPanData;
// 	ewsData: IEwsData;
// 	pwdData: IPwdData;
// 	casteCertData: ICasteCertData;
// 	gateScoreData: IGateScoreData;
// 	setAadhaarData: (data: IAadhaarData) => void;
// 	setPanData: (data: IPanData) => void;
// 	setEwsData: (data: IEwsData) => void;
// 	setPwdData: (data: IPwdData) => void;
// 	setCasteCertData: (data: ICasteCertData) => void;
// 	setGateScoreData: (data: IGateScoreData) => void;
// }

// const DocumentForm = ({
// 	type,
// 	aadhaarData,
// 	panData,
// 	ewsData,
// 	pwdData,
// 	casteCertData,
// 	gateScoreData,
// 	setAadhaarData,
// 	setPanData,
// 	setEwsData,
// 	setPwdData,
// 	setCasteCertData,
// 	setGateScoreData,
// }: DocumentFormProps) => {
// 	switch (type) {
// 		case 'aadhaar':
// 			return (
// 				<div className='flex flex-col gap-2'>
// 					<Input
// 						placeholder='Name'
// 						value={aadhaarData.name ?? ''}
// 						onChange={(e) =>
// 							setAadhaarData({ ...aadhaarData, name: e.target.value })
// 						}
// 					/>
// 					<Input
// 						placeholder='Aadhaar Number'
// 						value={aadhaarData.docno ?? ''}
// 						onChange={(e) =>
// 							setAadhaarData({ ...aadhaarData, docno: e.target.value })
// 						}
// 					/>
// 					<Input
// 						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
// 						value={aadhaarData.dob ?? ''}
// 						onChange={(e) =>
// 							setAadhaarData({ ...aadhaarData, dob: e.target.value })
// 						}
// 					/>
// 					<Select
// 						value={aadhaarData.gender!}
// 						onValueChange={(value) => {
// 							setAadhaarData({ ...aadhaarData, gender: value });
// 						}}
// 					>
// 						<SelectTrigger>Gender</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value='male'>Male</SelectItem>
// 							<SelectItem value='female'>Female</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</div>
// 			);
// 	}
// };

// export default DocumentForm;

// @ts-expect-error - untyped library
import React from 'react';
import { Input } from '@/components/ui/input'; // Adjust import as needed
import {
	IAadhaarData,
	ICasteCertData,
	IEwsData,
	IGateScoreData,
	IPanData,
	IPwdData,
} from '@/types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';

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
}

const DocumentForm = ({
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
					/>
					<Input
						placeholder='Aadhaar Number'
						value={aadhaarData.docno ?? ''}
						onChange={(e) =>
							setAadhaarData({ ...aadhaarData, docno: e.target.value })
						}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={aadhaarData.dob ?? ''}
						onChange={(e) =>
							setAadhaarData({ ...aadhaarData, dob: e.target.value })
						}
					/>
					<Select
						value={aadhaarData.gender!}
						onValueChange={(value) => {
							setAadhaarData({ ...aadhaarData, gender: value });
						}}
					>
						<SelectTrigger>Gender</SelectTrigger>
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
					/>
					<Input
						placeholder='PAN Number'
						value={panData.docno ?? ''}
						onChange={(e) => setPanData({ ...panData, docno: e.target.value })}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={panData.dob ?? ''}
						onChange={(e) => setPanData({ ...panData, dob: e.target.value })}
					/>
					<Input
						placeholder="Father's Name"
						value={panData.fathername ?? ''}
						onChange={(e) =>
							setPanData({ ...panData, fathername: e.target.value })
						}
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
					/>
					<Input
						placeholder='Document Number'
						value={ewsData.docno ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, docno: e.target.value })}
					/>
					<Input
						placeholder='Certificate Number'
						value={ewsData.certno ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, certno: e.target.value })}
					/>
					<Input
						placeholder='Date of Issue'
						value={ewsData.dateofissue ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, dateofissue: e.target.value })
						}
					/>
					<Input
						placeholder='Valid Till'
						value={ewsData.validtill ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, validtill: e.target.value })
						}
					/>
					<Input
						placeholder='Income'
						value={ewsData.income ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, income: e.target.value })}
					/>
					<Input
						placeholder='Caste'
						value={ewsData.caste ?? ''}
						onChange={(e) => setEwsData({ ...ewsData, caste: e.target.value })}
					/>
					<Input
						placeholder='Address'
						value={ewsData.address ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, address: e.target.value })
						}
					/>
					<Input
						placeholder="Father's Name"
						value={ewsData.fathername ?? ''}
						onChange={(e) =>
							setEwsData({ ...ewsData, fathername: e.target.value })
						}
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
					/>
					<Input
						placeholder='Certificate Number'
						value={pwdData.certno ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, certno: e.target.value })}
					/>
					<Input
						placeholder='Date of Issue'
						value={pwdData.dateofissue ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, dateofissue: e.target.value })
						}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={pwdData.dob ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, dob: e.target.value })}
					/>
					<Select
						value={pwdData.gender!}
						onValueChange={(value) => {
							setPwdData({ ...pwdData, gender: value });
						}}
					>
						<SelectTrigger>Gender</SelectTrigger>
						<SelectContent>
							<SelectItem value='male'>Male</SelectItem>
							<SelectItem value='female'>Female</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder='Registration Number'
						value={pwdData.regno ?? ''}
						onChange={(e) => setPwdData({ ...pwdData, regno: e.target.value })}
					/>
					<Input
						placeholder='Address'
						value={pwdData.address ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, address: e.target.value })
						}
					/>
					<Input
						placeholder='Disability Percentage'
						value={pwdData.disabilitypercentage ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, disabilitypercentage: e.target.value })
						}
					/>
					<Input
						placeholder='Disability Type'
						value={pwdData.disabilitytype ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, disabilitytype: e.target.value })
						}
					/>
					<Input
						placeholder="Father's Name"
						value={pwdData.fathername ?? ''}
						onChange={(e) =>
							setPwdData({ ...pwdData, fathername: e.target.value })
						}
					/>
				</div>
			);

		case 'casteCert':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={casteCertData.name ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, name: e.target.value })
						}
					/>
					<Input
						placeholder='Certificate Number'
						value={casteCertData.certno ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, certno: e.target.value })
						}
					/>
					<Input
						placeholder="Father's Name"
						value={casteCertData.fathername ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, fathername: e.target.value })
						}
					/>
					<Input
						placeholder='Address'
						value={casteCertData.address ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, address: e.target.value })
						}
					/>
					<Input
						placeholder='Caste'
						value={casteCertData.caste ?? ''}
						onChange={(e) =>
							setCasteCertData({ ...casteCertData, caste: e.target.value })
						}
					/>
				</div>
			);

		case 'gateScore':
			return (
				<div className='flex flex-col gap-2'>
					<Input
						placeholder='Name'
						value={gateScoreData.name ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, name: e.target.value })
						}
					/>
					<Input
						placeholder="Parent's Name"
						value={gateScoreData.parentname ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, parentname: e.target.value })
						}
					/>
					<Input
						placeholder='Registration Number'
						value={gateScoreData.regno ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, regno: e.target.value })
						}
					/>
					<Input
						placeholder='Date of Birth (dd-mm-yyyy dd/mm/yyyy ddmmyyyy)'
						value={gateScoreData.dob ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, dob: e.target.value })
						}
					/>
					<Input
						placeholder='Exam Paper'
						value={gateScoreData.exampaper ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, exampaper: e.target.value })
						}
					/>
					<Input
						placeholder='GATE Score'
						value={gateScoreData.gatescore ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, gatescore: e.target.value })
						}
					/>
					<Input
						placeholder='Marks'
						value={gateScoreData.marks ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, marks: e.target.value })
						}
					/>
					<Input
						placeholder='AIR'
						value={gateScoreData.air ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, air: e.target.value })
						}
					/>
					<Input
						placeholder='Valid Upto'
						value={gateScoreData.validupto ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, validupto: e.target.value })
						}
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
					/>
					<Input
						placeholder='Caste'
						value={gateScoreData.caste ?? ''}
						onChange={(e) =>
							setGateScoreData({ ...gateScoreData, caste: e.target.value })
						}
					/>
				</div>
			);

		default:
			return <div>Invalid document type</div>;
	}
};

export default DocumentForm;

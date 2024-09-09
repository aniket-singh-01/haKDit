import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'; // Adjust import as needed
import {
	IAadhaarData,
	ICasteCertData,
	IEwsData,
	IGateScoreData,
	ILicenseData,
	IPanData,
	IPwdData,
	IResponse,
} from '@/types'; // Adjust import as needed
import { compareData } from './utils';

interface DocumentTableProps {
	apiResponse: IResponse;
	type: string;
	aadhaarData: IAadhaarData;
	panData: IPanData;
	ewsData: IEwsData;
	pwdData: IPwdData;
	casteCertData: ICasteCertData;
	gateScoreData: IGateScoreData;
	licenseData: ILicenseData;
}

const DocumentTable = ({
	apiResponse,
	type,
	aadhaarData,
	panData,
	ewsData,
	pwdData,
	casteCertData,
	gateScoreData,
}: DocumentTableProps) => {
	switch (type) {
		case 'aadhaar':
			return (
				<Table>
					<TableCaption>
						This table shows if the Aadhaar data you entered matches the data in
						the API response
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Field</TableHead>
							<TableHead>API Response</TableHead>
							<TableHead>Your Data</TableHead>
							<TableHead>Verified?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>{aadhaarData.name}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.name!, aadhaarData.name) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.name!, aadhaarData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{aadhaarData.dob}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.dob!, aadhaarData.dob) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.dob!, aadhaarData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Document Number</TableCell>
							<TableCell>{apiResponse.docno}</TableCell>
							<TableCell>{aadhaarData.docno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.docno!, aadhaarData.docno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.docno!, aadhaarData.docno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Gender</TableCell>
							<TableCell>{apiResponse.gender}</TableCell>
							<TableCell>{aadhaarData.gender}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.gender!, aadhaarData.gender) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.gender!, aadhaarData.gender)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
		case 'pan':
			return (
				<Table>
					<TableCaption>
						This table shows if the Aadhaar data you entered matches the data in
						the API response
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Field</TableHead>
							<TableHead>API Response</TableHead>
							<TableHead>Your Data</TableHead>
							<TableHead>Verified?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>{panData.name}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.name!, panData.name) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.name!, panData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{panData.dob}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.dob!, panData.dob) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.dob!, panData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Document Number</TableCell>
							<TableCell>{apiResponse.docno}</TableCell>
							<TableCell>{panData.docno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.docno!, panData.docno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.docno!, panData.docno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s Name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{panData.fathername}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.fathername!, panData.fathername) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.fathername!, panData.fathername)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
		case 'ews':
			return (
				<Table>
					<TableCaption>
						This table shows if the Aadhaar data you entered matches the data in
						the API response
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Field</TableHead>
							<TableHead>API Response</TableHead>
							<TableHead>Your Data</TableHead>
							<TableHead>Verified?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.name!, ewsData.name) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.name!, ewsData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Document Number</TableCell>
							<TableCell>{apiResponse.docno}</TableCell>
							<TableCell>{ewsData.docno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.docno!, ewsData.docno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.docno!, ewsData.docno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Certificate Number</TableCell>
							<TableCell>{apiResponse.certno}</TableCell>
							<TableCell>{ewsData.certno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.certno!, ewsData.certno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.certno!, ewsData.certno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Issue</TableCell>
							<TableCell>{apiResponse.dateofissue}</TableCell>
							<TableCell>{ewsData.dateofissue}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.dateofissue!, ewsData.dateofissue) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.dateofissue!, ewsData.dateofissue)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Valid Upto</TableCell>
							<TableCell>{apiResponse.validtill}</TableCell>
							<TableCell>{ewsData.validtill}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.validtill!, ewsData.validtill) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.validtill!, ewsData.validtill)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Income</TableCell>
							<TableCell>{apiResponse.income}</TableCell>
							<TableCell>{ewsData.income}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.income!, ewsData.income) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.income!, ewsData.income)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Caste</TableCell>
							<TableCell>{apiResponse.caste}</TableCell>
							<TableCell>{ewsData.caste}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.caste!, ewsData.caste) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.caste!, ewsData.caste)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell>{apiResponse.address}</TableCell>
							<TableCell>{ewsData.address}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.address!, ewsData.address) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.address!, ewsData.address)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{ewsData.fathername}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.fathername!, ewsData.fathername) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.fathername!, ewsData.fathername)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
		case 'pwd':
			return (
				<Table>
					<TableCaption>
						This table shows if the Aadhaar data you entered matches the data in
						the API response
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Field</TableHead>
							<TableHead>API Response</TableHead>
							<TableHead>Your Data</TableHead>
							<TableHead>Verified?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.name!, pwdData.name) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.name!, pwdData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Certificate Number</TableCell>
							<TableCell>{apiResponse.certno}</TableCell>
							<TableCell>{pwdData.certno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.certno!, pwdData.certno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.certno!, pwdData.certno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Issue</TableCell>
							<TableCell>{apiResponse.dateofissue}</TableCell>
							<TableCell>{pwdData.dateofissue}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.dateofissue!, pwdData.dateofissue) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.dateofissue!, pwdData.dateofissue)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{pwdData.dob}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.dob!, pwdData.dob) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.dob!, pwdData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Gender</TableCell>
							<TableCell>{apiResponse.gender}</TableCell>
							<TableCell>{pwdData.gender}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.gender!, pwdData.gender) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.gender!, pwdData.gender)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Registration Number</TableCell>
							<TableCell>{apiResponse.regno}</TableCell>
							<TableCell>{pwdData.regno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.regno!, pwdData.regno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.regno!, pwdData.regno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell>{apiResponse.address}</TableCell>
							<TableCell>{pwdData.address}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.address!, pwdData.address) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.address!, pwdData.address)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s Name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{pwdData.fathername}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.fathername!, pwdData.fathername) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.fathername!, pwdData.fathername)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Disability Percentage</TableCell>
							<TableCell>{apiResponse.disabilitypercentage}</TableCell>
							<TableCell>{pwdData.disabilitypercentage}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.disabilitypercentage!,
										pwdData.disabilitypercentage
									) == 'Yes'
								} ? "bg-green-600" : "bg-red-600"`}
							>
								{compareData(
									apiResponse.disabilitypercentage!,
									pwdData.disabilitypercentage
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Disability Type</TableCell>
							<TableCell>{apiResponse.disabilitytype}</TableCell>
							<TableCell>{pwdData.disabilitytype}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.disabilitytype!,
										pwdData.disabilitytype
									) == 'Yes'
								} ? "bg-green-600" : "bg-red-600"`}
							>
								{compareData(
									apiResponse.disabilitytype!,
									pwdData.disabilitytype
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
		case 'caste':
			return (
				<Table>
					<TableCaption>
						This table shows if the Aadhaar data you entered matches the data in
						the API response
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Field</TableHead>
							<TableHead>API Response</TableHead>
							<TableHead>Your Data</TableHead>
							<TableHead>Verified?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>{casteCertData.name}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.name!, casteCertData.name) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.name!, casteCertData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Certificate Number</TableCell>
							<TableCell>{apiResponse.certno}</TableCell>
							<TableCell>{casteCertData.certno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.certno!, casteCertData.certno) ==
									'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.certno!, casteCertData.certno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s Name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{casteCertData.fathername}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.fathername!,
										casteCertData.fathername
									) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.fathername!, casteCertData.fathername)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Caste</TableCell>
							<TableCell>{apiResponse.caste}</TableCell>
							<TableCell>{casteCertData.caste}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.caste!, casteCertData.caste) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.caste!, casteCertData.caste)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
		case 'gate':
			return (
				<Table>
					<TableCaption>
						This table shows if the Aadhaar data you entered matches the data in
						the API response
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Field</TableHead>
							<TableHead>API Response</TableHead>
							<TableHead>Your Data</TableHead>
							<TableHead>Verified?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>{gateScoreData.name}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.name!, gateScoreData.name) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.name!, gateScoreData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Parent Name</TableCell>
							<TableCell>{apiResponse.parentname}</TableCell>
							<TableCell>{gateScoreData.parentname}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.parentname!,
										gateScoreData.parentname
									) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.parentname!, gateScoreData.parentname)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Registration Number</TableCell>
							<TableCell>{apiResponse.regno}</TableCell>
							<TableCell>{gateScoreData.regno}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.regno!, gateScoreData.regno) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.regno!, gateScoreData.regno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{gateScoreData.dob}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.dob!, gateScoreData.dob) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.dob!, gateScoreData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Exam Paper</TableCell>
							<TableCell>{apiResponse.exampaper}</TableCell>
							<TableCell>{gateScoreData.exampaper}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.exampaper!,
										gateScoreData.exampaper
									) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.exampaper!, gateScoreData.exampaper)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>GATE Score</TableCell>
							<TableCell>{apiResponse.gatescore}</TableCell>
							<TableCell>{gateScoreData.gatescore}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.gatescore!,
										gateScoreData.gatescore
									) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.gatescore!, gateScoreData.gatescore)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Total Marks</TableCell>
							<TableCell>{apiResponse.marks}</TableCell>
							<TableCell>{gateScoreData.marks}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.marks!, gateScoreData.marks) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.marks!, gateScoreData.marks)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>AIR</TableCell>
							<TableCell>{apiResponse.air}</TableCell>
							<TableCell>{gateScoreData.air}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.air!, gateScoreData.air) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.air!, gateScoreData.air)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Valid Upto</TableCell>
							<TableCell>{apiResponse.validupto}</TableCell>
							<TableCell>{gateScoreData.validupto}</TableCell>
							<TableCell
								className={`${
									compareData(
										apiResponse.validupto!,
										gateScoreData.validupto
									) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.validupto!, gateScoreData.validupto)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Qualifying Marks</TableCell>
							<TableCell>{apiResponse.qualifyingmarks}</TableCell>
							<TableCell>{gateScoreData.qualifyingmarks}</TableCell>
							<TableCell>
								{compareData(
									apiResponse.qualifyingmarks!,
									gateScoreData.qualifyingmarks
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Caste</TableCell>
							<TableCell>{apiResponse.caste}</TableCell>
							<TableCell>{gateScoreData.caste}</TableCell>
							<TableCell
								className={`${
									compareData(apiResponse.caste!, gateScoreData.caste) == 'Yes'
										? 'bg-green-600'
										: 'bg-red-600'
								}`}
							>
								{compareData(apiResponse.caste!, gateScoreData.caste)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
	}
};

export default DocumentTable;

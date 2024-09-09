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
	licenseData,
}: DocumentTableProps) => {
	const compareData = (apiData: string | null, userData: string | null) => {
		return apiData!.toLowerCase().replaceAll(' ', '') ===
			userData!.toLowerCase().replaceAll(' ', '')
			? 'Yes'
			: 'No';
	};

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
							<TableCell>
								{compareData(apiResponse.name!, aadhaarData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{aadhaarData.dob}</TableCell>
							<TableCell>
								{compareData(apiResponse.dob!, aadhaarData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Document Number</TableCell>
							<TableCell>{apiResponse.docno}</TableCell>
							<TableCell>{aadhaarData.docno}</TableCell>
							<TableCell>
								{compareData(apiResponse.docno!, aadhaarData.docno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Gender</TableCell>
							<TableCell>{apiResponse.gender}</TableCell>
							<TableCell>{aadhaarData.gender}</TableCell>
							<TableCell>
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
							<TableCell>{apiResponse.name}</TableCell>
							<TableCell>
								{compareData(apiResponse.name!, panData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{panData.dob}</TableCell>
							<TableCell>
								{compareData(apiResponse.dob!, panData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Document Number</TableCell>
							<TableCell>{apiResponse.docno}</TableCell>
							<TableCell>{panData.docno}</TableCell>
							<TableCell>
								{compareData(apiResponse.docno!, panData.docno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s Name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{panData.fathername}</TableCell>
							<TableCell>
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
							<TableCell>
								{compareData(apiResponse.name!, ewsData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Document Number</TableCell>
							<TableCell>{apiResponse.docno}</TableCell>
							<TableCell>{ewsData.docno}</TableCell>
							<TableCell>
								{compareData(apiResponse.docno!, ewsData.docno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Certificate Number</TableCell>
							<TableCell>{apiResponse.certno}</TableCell>
							<TableCell>{ewsData.certno}</TableCell>
							<TableCell>
								{compareData(apiResponse.certno!, ewsData.certno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Issue</TableCell>
							<TableCell>{apiResponse.dateofissue}</TableCell>
							<TableCell>{ewsData.dateofissue}</TableCell>
							<TableCell>
								{compareData(apiResponse.dateofissue!, ewsData.dateofissue)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Valid Upto</TableCell>
							<TableCell>{apiResponse.validtill}</TableCell>
							<TableCell>{ewsData.validtill}</TableCell>
							<TableCell>
								{compareData(apiResponse.validtill!, ewsData.validtill)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Income</TableCell>
							<TableCell>{apiResponse.income}</TableCell>
							<TableCell>{ewsData.income}</TableCell>
							<TableCell>
								{compareData(apiResponse.income!, ewsData.income)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Caste</TableCell>
							<TableCell>{apiResponse.caste}</TableCell>
							<TableCell>{ewsData.caste}</TableCell>
							<TableCell>
								{compareData(apiResponse.caste!, ewsData.caste)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell>{apiResponse.address}</TableCell>
							<TableCell>{ewsData.address}</TableCell>
							<TableCell>
								{compareData(apiResponse.address!, ewsData.address)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{ewsData.fathername}</TableCell>
							<TableCell>
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
							<TableCell>
								{compareData(apiResponse.name!, pwdData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Certificate Number</TableCell>
							<TableCell>{apiResponse.certno}</TableCell>
							<TableCell>{pwdData.certno}</TableCell>
							<TableCell>
								{compareData(apiResponse.certno!, pwdData.certno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Issue</TableCell>
							<TableCell>{apiResponse.dateofissue}</TableCell>
							<TableCell>{pwdData.dateofissue}</TableCell>
							<TableCell>
								{compareData(apiResponse.dateofissue!, pwdData.dateofissue)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{pwdData.dob}</TableCell>
							<TableCell>
								{compareData(apiResponse.dob!, pwdData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Gender</TableCell>
							<TableCell>{apiResponse.gender}</TableCell>
							<TableCell>{pwdData.gender}</TableCell>
							<TableCell>
								{compareData(apiResponse.gender!, pwdData.gender)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Registration Number</TableCell>
							<TableCell>{apiResponse.regno}</TableCell>
							<TableCell>{pwdData.regno}</TableCell>
							<TableCell>
								{compareData(apiResponse.regno!, pwdData.regno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell>{apiResponse.address}</TableCell>
							<TableCell>{pwdData.address}</TableCell>
							<TableCell>
								{compareData(apiResponse.address!, pwdData.address)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s Name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{pwdData.fathername}</TableCell>
							<TableCell>
								{compareData(apiResponse.fathername!, pwdData.fathername)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Disability Percentage</TableCell>
							<TableCell>{apiResponse.disabilitypercentage}</TableCell>
							<TableCell>{pwdData.disabilitypercentage}</TableCell>
							<TableCell>
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
							<TableCell>
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
							<TableCell>
								{compareData(apiResponse.name!, casteCertData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Certificate Number</TableCell>
							<TableCell>{apiResponse.certno}</TableCell>
							<TableCell>{casteCertData.certno}</TableCell>
							<TableCell>
								{compareData(apiResponse.certno!, casteCertData.certno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Father&apos;s Name</TableCell>
							<TableCell>{apiResponse.fathername}</TableCell>
							<TableCell>{casteCertData.fathername}</TableCell>
							<TableCell>
								{compareData(apiResponse.fathername!, casteCertData.fathername)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Caste</TableCell>
							<TableCell>{apiResponse.caste}</TableCell>
							<TableCell>{casteCertData.caste}</TableCell>
							<TableCell>
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
							<TableCell>
								{compareData(apiResponse.name!, gateScoreData.name)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Parent Name</TableCell>
							<TableCell>{apiResponse.parentname}</TableCell>
							<TableCell>{gateScoreData.parentname}</TableCell>
							<TableCell>
								{compareData(apiResponse.parentname!, gateScoreData.parentname)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Registration Number</TableCell>
							<TableCell>{apiResponse.regno}</TableCell>
							<TableCell>{gateScoreData.regno}</TableCell>
							<TableCell>
								{compareData(apiResponse.regno!, gateScoreData.regno)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Date of Birth</TableCell>
							<TableCell>{apiResponse.dob}</TableCell>
							<TableCell>{gateScoreData.dob}</TableCell>
							<TableCell>
								{compareData(apiResponse.dob!, gateScoreData.dob)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Exam Paper</TableCell>
							<TableCell>{apiResponse.exampaper}</TableCell>
							<TableCell>{gateScoreData.exampaper}</TableCell>
							<TableCell>
								{compareData(apiResponse.exampaper!, gateScoreData.exampaper)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>GATE Score</TableCell>
							<TableCell>{apiResponse.gatescore}</TableCell>
							<TableCell>{gateScoreData.gatescore}</TableCell>
							<TableCell>
								{compareData(apiResponse.gatescore!, gateScoreData.gatescore)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Total Marks</TableCell>
							<TableCell>{apiResponse.marks}</TableCell>
							<TableCell>{gateScoreData.marks}</TableCell>
							<TableCell>
								{compareData(apiResponse.marks!, gateScoreData.marks)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>AIR</TableCell>
							<TableCell>{apiResponse.air}</TableCell>
							<TableCell>{gateScoreData.air}</TableCell>
							<TableCell>
								{compareData(apiResponse.air!, gateScoreData.air)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Valid Upto</TableCell>
							<TableCell>{apiResponse.validupto}</TableCell>
							<TableCell>{gateScoreData.validupto}</TableCell>
							<TableCell>
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
							<TableCell>
								{compareData(apiResponse.caste!, gateScoreData.caste)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
	}
};

export default DocumentTable;

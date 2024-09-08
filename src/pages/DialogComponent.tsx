import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog'; // Adjust import as needed
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'; // Adjust import as needed

interface DialogComponentProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm?: () => void;
	onSubmit?: () => void;
	error?: string;
	formComponent?: React.ReactNode;
	selectedDocType?: string;
	setSelectedDocType?: (type: string) => void;
	setSelectedFile?: (file: File | null) => void;
	fileInputRef?: React.RefObject<HTMLInputElement>;
}

const DialogComponent = ({
	isOpen,
	onClose,
	onConfirm,
	onSubmit,
	error,
	formComponent,
	selectedDocType,
	setSelectedDocType,
	setSelectedFile,
	fileInputRef,
}: DialogComponentProps) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogHeader>
				<DialogTitle>{error ? 'Error' : 'Document Upload'}</DialogTitle>
				<DialogDescription>
					{error
						? error
						: 'Please upload your document and enter the required information.'}
				</DialogDescription>
			</DialogHeader>
			<DialogContent>
				{error ? (
					<p>{error}</p>
				) : formComponent ? (
					formComponent
				) : (
					<div>
						<Select
							onValueChange={(value) =>
								setSelectedDocType && setSelectedDocType(value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select Document Type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='aadhaar'>Aadhaar Card</SelectItem>
								<SelectItem value='pan'>PAN Card</SelectItem>
								{/* Add other document types here */}
							</SelectContent>
						</Select>
						<input
							type='file'
							ref={fileInputRef}
							accept='image/*,application/pdf'
							onChange={(e) =>
								setSelectedFile && setSelectedFile(e.target.files?.[0] || null)
							}
						/>
					</div>
				)}
			</DialogContent>
			<DialogFooter>
				<Button
					variant='outline'
					onClick={onClose}
				>
					Cancel
				</Button>
				{onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
				{onSubmit && <Button onClick={onSubmit}>Submit</Button>}
			</DialogFooter>
		</Dialog>
	);
};

export default DialogComponent;

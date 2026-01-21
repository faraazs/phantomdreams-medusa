import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import { cn } from "@lib/utils"

/**
 * Props for the Modal-modal component
 */
type ModalModalProps = {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback function to close the modal */
  close: () => void
  /** Size of the modal */
  size?: "small" | "medium" | "large"
  /** Whether this is a search modal (transparent background) */
  search?: boolean
  /** Content to render inside the modal */
  children: React.ReactNode
  /** Test ID for testing */
  "data-testid"?: string
}

/**
 * Modal-modal: Modal dialog component with configurable sizes
 * 
 * @primitive modal (dialog)
 * @component
 * @example
 * ```tsx
 * <ModalModal 
 *   isOpen={isOpen} 
 *   close={() => setIsOpen(false)}
 *   size="medium"
 * >
 *   <ModalModal.Title>Confirm Action</ModalModal.Title>
 *   <ModalModal.Description>
 *     Are you sure you want to proceed?
 *   </ModalModal.Description>
 *   <ModalModal.Footer>
 *     <button onClick={handleConfirm}>Confirm</button>
 *   </ModalModal.Footer>
 * </ModalModal>
 * ```
 */
const ModalModal: React.FC<ModalModalProps> & {
  Title: typeof Title
  Description: typeof Description
  Body: typeof Body
  Footer: typeof Footer
} = ({ isOpen, close, size = "medium", search = false, children, "data-testid": dataTestId }) => {
  const maxWidthClass = {
    small: "max-w-md",
    medium: "max-w-xl",
    large: "max-w-3xl",
  }[size]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className={cn(
          maxWidthClass,
          search && "bg-transparent shadow-none border-0",
          "max-h-[75vh] overflow-y-auto"
        )}
        data-testid={dataTestId}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

/**
 * Modal title component
 */
const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <DialogTitle className={cn("text-large-semi", className)}>{children}</DialogTitle>
}

/**
 * Modal description component
 */
const Description: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <DialogDescription
      className={cn("text-small-regular text-ui-fg-base pt-2 pb-4", className)}
    >
      {children}
    </DialogDescription>
  )
}

/**
 * Modal body component
 */
const Body: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={cn("flex justify-center", className)}>{children}</div>
}

/**
 * Modal footer component
 */
const Footer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-end gap-x-4 mt-4", className)}>
      {children}
    </div>
  )
}

ModalModal.Title = Title
ModalModal.Description = Description
ModalModal.Body = Body
ModalModal.Footer = Footer

export default ModalModal

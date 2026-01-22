"use client"

/**
 * Custom MDX components for blog posts
 * These components can be used to override default MDX rendering
 * or add custom interactive components to blog posts
 */

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Common components from modules
import InputInput from "@modules/common/components/input"
import ModalModal from "@modules/common/components/modal"

/**
 * ComponentDemo - Wrapper for displaying interactive component demos
 */
const ComponentDemo = ({
  name,
  children,
  className = "",
}: {
  name?: string
  children: React.ReactNode
  className?: string
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false)

  return (
    <div className="my-8 border border-gray-200 rounded-lg overflow-hidden">
      {name && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700">{name}</h4>
        </div>
      )}
      <div className={`p-6 bg-white ${className}`}>
        <div className="flex flex-wrap gap-4 items-center">{children}</div>
      </div>
      {isCodeVisible && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <button
            onClick={() => setIsCodeVisible(false)}
            className="text-xs text-gray-600 hover:text-gray-900 mb-2"
          >
            Hide Code
          </button>
          <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
            <code>{JSON.stringify(children, null, 2)}</code>
          </pre>
        </div>
      )}
      {!isCodeVisible && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
          <button
            onClick={() => setIsCodeVisible(true)}
            className="text-xs text-gray-600 hover:text-gray-900"
          >
            View Code
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * CodeBlock - For displaying source code with syntax highlighting
 */
const CodeBlock = ({
  code,
  language = "tsx",
}: {
  code: string
  language?: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4">
      <div className="flex justify-between items-center bg-gray-800 text-gray-100 px-4 py-2 rounded-t">
        <span className="text-xs font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/**
 * InteractiveButtonDemo - Shows all button variants
 */
const InteractiveButtonDemo = () => {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="default" onClick={() => setClickCount(clickCount + 1)}>
          Default
        </Button>
        <Button variant="destructive" onClick={() => setClickCount(clickCount + 1)}>
          Destructive
        </Button>
        <Button variant="outline" onClick={() => setClickCount(clickCount + 1)}>
          Outline
        </Button>
        <Button variant="secondary" onClick={() => setClickCount(clickCount + 1)}>
          Secondary
        </Button>
        <Button variant="ghost" onClick={() => setClickCount(clickCount + 1)}>
          Ghost
        </Button>
        <Button variant="link" onClick={() => setClickCount(clickCount + 1)}>
          Link
        </Button>
      </div>
      <div className="text-sm text-gray-600">
        Button clicked: {clickCount} times
      </div>
    </div>
  )
}

/**
 * InteractiveInputDemo - Shows input with state
 */
const InteractiveInputDemo = () => {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="demo-input">Enter some text</Label>
        <Input
          id="demo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
      </div>
      {value && (
        <div className="text-sm text-gray-600">
          You typed: <span className="font-semibold">{value}</span>
        </div>
      )}
    </div>
  )
}

/**
 * InteractiveCheckboxDemo - Shows checkbox with state
 */
const InteractiveCheckboxDemo = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="demo-checkbox" 
          checked={checked} 
          onCheckedChange={(value) => setChecked(value === true)} 
        />
        <Label htmlFor="demo-checkbox">Accept terms and conditions</Label>
      </div>
      {checked && (
        <div className="text-sm text-green-600">
          ✓ Checkbox is checked
        </div>
      )}
    </div>
  )
}

/**
 * InteractiveSelectDemo - Shows select with state
 */
const InteractiveSelectDemo = () => {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label>Choose an option</Label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
            <SelectItem value="option4">Option 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {value && (
        <div className="text-sm text-gray-600">
          Selected: <span className="font-semibold">{value}</span>
        </div>
      )}
    </div>
  )
}

/**
 * InteractiveDialogDemo - Shows dialog
 */
const InteractiveDialogDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example Dialog</DialogTitle>
          <DialogDescription>
            This is an example dialog component. You can put any content here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Click the X or press Escape to close this dialog.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * InteractiveModalDemo - Shows modal
 */
const InteractiveModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalModal isOpen={isOpen} close={() => setIsOpen(false)} size="medium">
        <ModalModal.Title>Example Modal</ModalModal.Title>
        <ModalModal.Description>
          This is an example modal component wrapping the Dialog component.
        </ModalModal.Description>
        <ModalModal.Body>
          <p className="text-sm text-gray-600">Modal content goes here.</p>
        </ModalModal.Body>
        <ModalModal.Footer>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </ModalModal.Footer>
      </ModalModal>
    </div>
  )
}

/**
 * InteractiveInputInputDemo - Shows InputInput with state
 */
const InteractiveInputInputDemo = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="space-y-4 w-full max-w-md">
      <InputInput
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        required
      />
      <InputInput
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        topLabel="Account Security"
        required
      />
      {email && password && (
        <div className="text-sm text-gray-600">
          Email: {email} | Password: {"*".repeat(password.length)}
        </div>
      )}
    </div>
  )
}

export const BlogMDXComponents = {
  // Base UI Components
  Button,
  Input,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  
  // Common Module Components
  InputInput,
  ModalModal,
  
  // Demo Wrappers
  ComponentDemo,
  CodeBlock,
  
  // Interactive Demos
  InteractiveButtonDemo,
  InteractiveInputDemo,
  InteractiveCheckboxDemo,
  InteractiveSelectDemo,
  InteractiveDialogDemo,
  InteractiveModalDemo,
  InteractiveInputInputDemo,
}

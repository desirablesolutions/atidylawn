"use client"

import { Button } from "@/components/ui/button"

import * as React from "react"
import { Command as CommandPrimitive, CommandItem, CommandList, CommandEmpty, CommandGroup } from "cmdk"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

interface CommandComboboxProps {
  items: string[]
  placeholder?: string
  onSelect: (value: string) => void
}

const CommandCombobox = ({ items, placeholder, onSelect }: CommandComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? items.find((item) => item === value) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <CommandPrimitive>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    setValue(item)
                    setOpen(false)
                    onSelect(item)
                  }}
                >
                  {item}
                  <Check className={cn("ml-auto h-4 w-4", value === item ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandPrimitive>
      </PopoverContent>
    </Popover>
  )
}

export { CommandCombobox }


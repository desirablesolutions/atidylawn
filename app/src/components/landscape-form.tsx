"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { landscapeFormAction } from "@/lib/actions"
import { Check } from "lucide-react"
import { services } from "@/lib/types"
import { AiHelpButton } from "./ai-help-button"

export function LandscapeForm({ className }: React.ComponentProps<typeof Card>) {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([])
  const [totalPrice, setTotalPrice] = React.useState(0)

  const [state, formAction, pending] = React.useActionState(landscapeFormAction, {
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      selectedServices: [],
      totalPrice: 0,
    },
    success: false,
    errors: null,
  })

  const handleServiceChange = (checked: boolean, serviceId: string) => {
    setSelectedServices((prev) => {
      const newSelection = checked ? [...prev, serviceId] : prev.filter((id) => id !== serviceId)

      const newTotal = services
        .filter((service) => newSelection.includes(service.id))
        .reduce((sum, service) => sum + service.price, 0)

      setTotalPrice(newTotal)
      return newSelection
    })
  }

  return (
    <Card className={cn("w-full max-w-lg", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          A Tidy Lawn
        </CardTitle>
        <CardDescription className="text-emerald-100/80">
          Transform your outdoor space with our professional landscaping services
        </CardDescription>
      </CardHeader>
      <form action={()=> undefined}>
        <CardContent className="space-y-6">
          {state.success ? (
            <p className="text-emerald-400 flex items-center gap-2 text-sm">
              <Check className="size-4" />
              Thank you for your interest. We&apos;ll be in touch soon!
            </p>
          ) : null}

          <div className="grid grid-cols-2 gap-4">
            <div className="group/field space-y-2" data-invalid={!!state.errors?.firstName}>
              <Label htmlFor="firstName" className="group-data-[invalid=true]/field:text-red-400">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                className={cn(
                  "bg-emerald-950/30 border-emerald-600/20 shadow-inner",
                  "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
                  "group-data-[invalid=true]/field:border-red-400",
                )}
                disabled={pending}
                defaultValue={state.defaultValues.firstName}
              />
              {state.errors?.firstName && <p className="text-red-400 text-sm">{state.errors.firstName}</p>}
            </div>

            <div className="group/field space-y-2" data-invalid={!!state.errors?.lastName}>
              <Label htmlFor="lastName" className="group-data-[invalid=true]/field:text-red-400">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                className={cn(
                  "bg-emerald-950/30 border-emerald-600/20 shadow-inner",
                  "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
                  "group-data-[invalid=true]/field:border-red-400",
                )}
                disabled={pending}
                defaultValue={state.defaultValues.lastName}
              />
              {state.errors?.lastName && <p className="text-red-400 text-sm">{state.errors.lastName}</p>}
            </div>
          </div>

          <div className="group/field space-y-2" data-invalid={!!state.errors?.phone}>
            <Label htmlFor="phone" className="group-data-[invalid=true]/field:text-red-400">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              className={cn(
                "bg-emerald-950/30 border-emerald-600/20 shadow-inner",
                "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
                "group-data-[invalid=true]/field:border-red-400",
              )}
              disabled={pending}
              defaultValue={state.defaultValues.phone}
            />
            {state.errors?.phone && <p className="text-red-400 text-sm">{state.errors.phone}</p>}
          </div>

          <div className="group/field space-y-2" data-invalid={!!state.errors?.email}>
            <Label htmlFor="email" className="group-data-[invalid=true]/field:text-red-400">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className={cn(
                "bg-emerald-950/30 border-emerald-600/20 shadow-inner",
                "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
                "group-data-[invalid=true]/field:border-red-400",
              )}
              disabled={pending}
              defaultValue={state.defaultValues.email}
            />
            {state.errors?.email && <p className="text-red-400 text-sm">{state.errors.email}</p>}
          </div>

          <div className="space-y-4">
            <Label>Select Services</Label>
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-emerald-950/30 border border-emerald-600/20"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={service.id}
                      name="selectedServices"
                      value={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => handleServiceChange(checked as boolean, service.id)}
                      className="border-emerald-500 data-[state=checked]:bg-emerald-500"
                    />
                    <div>
                      <Label
                        htmlFor={service.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service.name}
                      </Label>
                      <p className="text-sm text-emerald-100/60">${service.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-100/60">{service.description}</p>
                </div>
              ))}
            </div>
            {state.errors?.selectedServices && <p className="text-red-400 text-sm">{state.errors.selectedServices}</p>}
          </div>

          <div className="flex justify-between items-center p-4 rounded-lg bg-emerald-950/30 border border-emerald-600/20">
            <Label>Total Price:</Label>
            <p className="text-xl font-bold text-emerald-400">${totalPrice}</p>
            <input type="hidden" name="totalPrice" value={totalPrice} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
          >
            {pending ? "Submitting..." : "Request Service"}
          </Button>
        </CardFooter>
      </form>
      <AiHelpButton />
    </Card>
  )
}


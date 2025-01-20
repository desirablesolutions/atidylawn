import { z } from "zod"

export const landscapeFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(32, { message: "First name must be at most 32 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(32, { message: "Last name must be at most 32 characters" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
  selectedServices: z.array(z.string()).min(1, { message: "Please select at least one service" }),
  totalPrice: z.number().min(0),
})


"use server"

import { landscapeFormSchema } from "@/lib/schema"
import { z } from "zod"

export async function landscapeFormAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.union([z.string(), z.array(z.string())]))
    .parse(Object.fromEntries(formData.entries()))

  try {
    const rawData = Object.fromEntries(formData.entries())
    const selectedServices = formData.getAll("selectedServices")
    const data = landscapeFormSchema.parse({
      ...rawData,
      selectedServices,
      totalPrice: Number(formData.get("totalPrice")),
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)

    return {
      defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        selectedServices: [],
        totalPrice: 0,
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.join(", ")]),
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}


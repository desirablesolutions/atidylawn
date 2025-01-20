import type { FormData } from "./types"

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID

export async function submitToNotion(data: FormData) {
  try {
    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: data.name } }] },
          Email: { rich_text: [{ text: { content: data.email } }] },
          Service: { rich_text: [{ text: { content: data.service } }] },
          Message: { rich_text: [{ text: { content: data.message } }] },
          Status: { select: { name: "New" } },
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Notion")
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting to Notion:", error)
    return { success: false, error }
  }
}


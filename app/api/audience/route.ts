import { EmailTemplate } from "../utils/onboard-email-template"
import { resend } from "../utils/resend-client"

const audienceId = process.env.RESEND_AUDIENCE_ID

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    if (!audienceId) {
      throw new Error("RESEND_AUDIENCE_ID is not set")
    }

    const response = await resend.contacts.create({
      audienceId,
      email,
    })
    console.log({ response })

    if (response.error) {
      return new Response(response.error.message, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "La Classe <bienvenue@laclasse.app>",
      to: [email],
      subject: "Bienvenue dans La Classe !",
      react: EmailTemplate(),
    })

    console.log({ data, error })

    if (error) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("Contact added to audience", { status: 200 })
  } catch (error) {
    return new Response("Internal server error", { status: 500 })
  }
}

export async function GET(request: Request) {
  return new Response("Hello World", { status: 200 })
}

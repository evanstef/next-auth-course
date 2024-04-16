import { Resend }from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

const laman = process.env.NEXT_PUBLIC_APP


export const sendTwoFactorToken = async (email: string, token: string) => {
    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Your 2FA token",
        html : `<p>Your 2FA token is ${token}</p>`
    })
}


export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetLink = `${laman}/auth/new-password?token=${token}`

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Reset your password",
        html : `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${laman}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Verify your email",
        html : `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })
}
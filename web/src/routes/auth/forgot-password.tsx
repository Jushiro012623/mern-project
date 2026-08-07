import {createFileRoute, Link} from "@tanstack/react-router"
import {ArrowLeft, Gem, Mail} from "lucide-react";
import {useFormValue} from "#/hooks";
import type {FormEvent} from "react";
import {ForgotPasswordSchema} from "#/lib/zod/schema.ts";
import {flattenError} from "#/lib/utils.ts";
import {GridBackground} from "#/components/layout";
import {
  Button,
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
  Field, FieldDescription,
  FieldLabel,
  InputGroup, InputGroupAddon, InputGroupInput
} from "#/components/ui";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [
      {
        title: `Forgot Password | ${import.meta.env.VITE_APP_NAME}`
      }
    ]
  })
})

function ForgotPassword() {

  const {values, handleOnChange, setErrors, errors} = useFormValue<Infer<typeof ForgotPasswordSchema>>({email: ""})

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = ForgotPasswordSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors = flattenError(result.error).fieldErrors
      setErrors({
        email: fieldErrors.email?.[0],
      });
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <GridBackground/>
      <Card className="relative z-10 mx-auto w-full max-w-md bg-background">
        {/*------------------------CARD HEADER------------------------*/}
        <CardHeader>
          <Gem size={30} className="text-primary mb-2"/>
          <CardTitle className="text-lg">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a verification code to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/*-----------------------FORM-----------------------*/}
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            {/*-------------------USERNAME-------------------*/}
            <Field data-invalid={!!errors.email} className="grid gap-2">
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Mail/>
                </InputGroupAddon>
                <InputGroupInput
                  aria-invalid={!!errors.email}
                  id="email"
                  name="email"
                  placeholder="name@email.com"
                  value={values.email}
                  onChange={handleOnChange}
                />
              </InputGroup>
              <FieldDescription className={errors.email && "text-destructive"}>
                {errors.email || "Enter the email associated with your account. We'll send a verification code to reset your password."}
              </FieldDescription>
            </Field>
            {/*------------FORM BUTTON------------*/}
            <Button className="w-full" type="submit">
              Send OTP
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-6">
          <Link
            to="/auth/sign-in"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft size={16}/>
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

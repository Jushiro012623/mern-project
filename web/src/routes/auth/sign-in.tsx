import {createFileRoute, Link} from "@tanstack/react-router"
import {Eye, EyeClosed, Gem, Lock, Mail} from "lucide-react";
import {useEyeToggle, useFormValue} from "#/hooks";
import type {FormEvent} from "react";
import {SignInSchema} from "#/lib/zod/schema.ts";
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

export const Route = createFileRoute("/auth/sign-in")({
  component: SignIn,
  head: () => ({
    meta: [
      {
        title: `Sign In | ${import.meta.env.VITE_APP_NAME}`
      }
    ]
  })
})

function SignIn() {

  const {visible, toggle, inputType} = useEyeToggle()
  const {values, handleOnChange, setErrors, errors} = useFormValue<Infer<typeof SignInSchema>>({
    username: "",
    password: ""
  })

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = SignInSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors = flattenError(result.error).fieldErrors
      setErrors({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
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
          <CardTitle className="text-lg">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/*-----------------------FORM-----------------------*/}
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            {/*-------------------USERNAME-------------------*/}
            <Field data-invalid={!!errors.username} className="grid gap-2">
              <FieldLabel htmlFor="username">Email or username</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Mail/>
                </InputGroupAddon>
                <InputGroupInput
                  aria-invalid={!!errors.username}
                  id="username"
                  name="username"
                  placeholder="name@email.com"
                  value={values.username}
                  onChange={handleOnChange}
                />
              </InputGroup>
              {errors.username && (
                <FieldDescription className="text-destructive">
                  {errors.username}
                </FieldDescription>
              )}
            </Field>
            {/*-------------------PASSWORD-------------------*/}
            <Field data-invalid={!!errors.password} className="grid gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start"><Lock/></InputGroupAddon>
                <InputGroupInput
                  aria-invalid={!!errors.password}
                  id="password"
                  name="password"
                  type={inputType}
                  value={values.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={toggle}
                  className="cursor-pointer"
                  aria-label={visible ? "Hide password" : "Show password"}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {visible ? <Eye/> : <EyeClosed/>}
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldDescription className="text-destructive">
                  {errors.password}
                </FieldDescription>
              )}
            </Field>
            {/*------------FORM BUTTON------------*/}
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-6">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-border"/>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                DON'T HAVE AN ACCOUNT?
              </span>
            <div className="h-px flex-1 bg-border"/>
          </div>
          {/*---------CREATE ACCOUNT BUTTON---------*/}
          <Button variant="outline" className="w-full">
            <Link to="/auth/sign-up">
              Create an account
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

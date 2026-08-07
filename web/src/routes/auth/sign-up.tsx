import {createFileRoute, Link} from '@tanstack/react-router'
import {AuthLayout} from "#/components/layout";
import {
  Button, Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
  Field, FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon, InputGroupInput
} from "#/components/ui";
import {Eye, EyeClosed, Gem, Lock, Mail, User} from "lucide-react";
import {useEyeToggle, useFormValue} from "#/hooks";
import {SignUpSchema} from "#/lib/zod/schema.ts";
import type {FormEvent} from "react";
import {flattenError} from "#/lib/utils.ts";

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUp,
  head: () => ({
    meta: [
      {
        title: `Sign Up | ${import.meta.env.VITE_APP_NAME}`
      }
    ]
  })
})

function SignUp() {

  const {visible, toggle, inputType} = useEyeToggle()
  const {visible: cVisible, toggle: cToggle, inputType: cInputType} = useEyeToggle()

  const {values, handleOnChange, setErrors, errors} = useFormValue<Infer<typeof SignUpSchema>>({
    username: "", password: "", confirmPassword: "", email: ""
  })

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = SignUpSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors = flattenError(result.error).fieldErrors
      setErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
    }
  }

  return (
    <AuthLayout>
      <Card className="relative z-10 mx-auto w-full max-w-md bg-background">
        {/*------------------------CARD HEADER------------------------*/}
        <CardHeader>
          <Gem size={30} className="text-primary mb-2"/>
          <CardTitle className="text-lg">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account and get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/*-----------------------FORM-----------------------*/}
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            {/*-------------------USERNAME-------------------*/}
            <Field data-invalid={!!errors.username} className="grid gap-2">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <User/>
                </InputGroupAddon>
                <InputGroupInput
                  aria-invalid={!!errors.username}
                  id="username"
                  name="username"
                  placeholder="username"
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
            {/*-------------------EMAIL-------------------*/}
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
              {errors.email && (
                <FieldDescription className="text-destructive">
                  {errors.email}
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
              <FieldDescription className={errors.password && "text-destructive"}>
                {errors.password || "Use at least 8 characters with a mix of letters, numbers, and symbols for better security."}
              </FieldDescription>
            </Field>
            {/*-------------------CONFIRM PASSWORD-------------------*/}
            <Field data-invalid={!!errors.confirmPassword} className="grid gap-2">
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start"><Lock/></InputGroupAddon>
                <InputGroupInput
                  aria-invalid={!!errors.confirmPassword}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={cInputType}
                  value={values.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={cToggle}
                  className="cursor-pointer"
                  aria-label={cVisible ? "Hide Confirm Password" : "Show Confirm Password"}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {cVisible ? <Eye/> : <EyeClosed/>}
                </InputGroupAddon>
              </InputGroup>
              {errors.confirmPassword && (
                <FieldDescription className="text-destructive">
                  {errors.confirmPassword}
                </FieldDescription>
              )}
            </Field>
            {/*------------FORM BUTTON------------*/}
            <Button
              className="w-full"
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-6">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-border"/>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                ALREADY HAVE AN ACCOUNT?
              </span>
            <div className="h-px flex-1 bg-border"/>
          </div>
          {/*---------CREATE ACCOUNT BUTTON---------*/}
          <Link to="/auth/sign-in" className="w-full">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}

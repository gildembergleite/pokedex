import { Spinner } from '@chakra-ui/react'

export default function Loading() {
  return (
    <section className="w-full pt-32 flex flex-col justify-center items-center">
      <Spinner size="xl" />
    </section>
  )
}

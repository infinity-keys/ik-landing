import { PuzzleInput } from "@lib/types"
import { useForm, SubmitHandler } from "react-hook-form";
import { ETH_ADDRESS_REGEX } from "@lib/constants";
import { formSubmit } from "@lib/fetchers";

interface FormInput extends PuzzleInput {
  address: string;
}

const DevForm = ({ puzzleId }: PuzzleInput) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await formSubmit({ data })

    if (!res.ok) throw new Error(res.statusText);
    return true;
  };
  return (<>
    {isSubmitSuccessful && <p>Thank you for testing with us.</p>}
    {!isSubmitSuccessful && (
      <div className="">
        <h1 className="text-3xl font-medium mb-6">Dev</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="wallet" className="block pb-2">
            Wallet address
          </label>
          <input
            className="mb-6 block w-full lowercase rounded-md text-gray-150 placeholder:text-gray-150 text-sm py-2 px-4 bg-gray-500"
            type="text"
            placeholder="&rsaquo; starts with 0x, 40 characters long"
            pattern={ETH_ADDRESS_REGEX.source}
            {...register("address", {
              required: true,
              pattern: ETH_ADDRESS_REGEX,
            })}
          />
          {errors?.address && (
            <p>
              Addresses must start with &quot0x&quot and be 40
              characters long
            </p>
          )}
          <input type="hidden" {...register("puzzleId")} value={puzzleId} />
          <button
            className="block w-full text-xs text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
            type="submit"
            value="submit"
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </div>
    )}</>)
}

export default DevForm

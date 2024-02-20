import Button from 'src/components/Button/Button'

const RewardablePage = () => {
  return (
    <div className="flex h-auto items-center justify-center">
      <div className="inline-flex w-max flex-col items-stretch space-y-4">
        <Button to={'/puzzle'}>Puzzle</Button>
        <Button>Pack</Button>
        <Button>Bundle</Button>
      </div>
    </div>
  )
}

export default RewardablePage

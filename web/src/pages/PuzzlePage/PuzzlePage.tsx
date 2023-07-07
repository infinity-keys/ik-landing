import Button from 'src/components/Button/Button'

const RewardablePage = () => {
  return (
    <div className="flex h-auto items-center justify-center">
      <div className="inline-flex w-max flex-col items-stretch space-y-4">
        <Button text={'Create Puzzle'} to={'/puzzle/create'} />
        <Button text={'Edit Puzzle'} />
      </div>
    </div>
  )
}

export default RewardablePage

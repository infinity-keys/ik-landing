import Button from 'src/components/Button/Button'

const RewardablePage = () => {
  return (
    <div className="flex h-auto items-center justify-center">
      <div className="inline-flex w-max flex-col items-stretch space-y-4">
        <Button text={'Puzzle'} to={'/puzzle'} />
        <Button text={'Pack'} />
        <Button text={'Bundle'} />
      </div>
    </div>
  )
}

export default RewardablePage

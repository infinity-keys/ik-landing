import RewardablePackCell from 'src/components/RewardablePack/RewardablePackCell'

type RewardablePageProps = {
  slug: string
}

const RewardablePackPage = ({ slug }: RewardablePageProps) => {
  return (
    <div>
      <RewardablePackCell slug={slug} />
    </div>
  )
}
export default RewardablePackPage

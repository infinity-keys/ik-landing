import DiscordIcon from 'src/svgs/DiscordIcon'

const DiscordHelpButton = () => {
  return (
    <a
      href="https://discord.gg/infinitykeys"
      target="_blank"
      rel="noopener noreferrer"
      className="social-share inline-flex items-center rounded bg-discordPurple px-4 py-2 text-sm font-medium transition hover:bg-discordPurple/70"
    >
      Get Help
      <span className="ml-2">
        <DiscordIcon width={18} height={18} />
      </span>
    </a>
  )
}

export default DiscordHelpButton

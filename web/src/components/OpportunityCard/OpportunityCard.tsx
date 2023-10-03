import { OpportunityCardProps } from 'src/pages/HomePage/HomePage'

import Fade from '../Animations/Fade'
import Scale from '../Animations/Scale'

const OpportunityCard = ({
  image,
  title,
  description,
  delay = 0,
}: OpportunityCardProps & {
  delay?: number
}) => {
  return (
    <div className=" w-full max-w-xs flex-1 flex-col items-center text-center">
      <Fade delay={delay}>
        <div className="flex flex-col items-center text-center">
          <Scale delay={delay} scaleInitial={0.9}>
            <div className="mb-16 flex h-[175px] max-w-[175px] items-end">
              <img src={image} alt="" className="" />
            </div>
          </Scale>
          <h3 className="mb-2 text-5xl font-bold">{title}</h3>
          <p className="text-xl font-medium">{description}</p>
        </div>
      </Fade>
    </div>
  )
}

export default OpportunityCard

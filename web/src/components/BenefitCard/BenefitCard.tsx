import { useState } from 'react'

import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon'
import { m as motion, useReducedMotion, Variants } from 'framer-motion'

import Fade from 'src/components/Animations/Fade'
import Scale from 'src/components/Animations/Scale'
import Button from 'src/components/Button'
import { BenefitCardProps } from 'src/pages/HomePage/HomePage'

const ListVariants: Variants = {
  initial: {},
  animate: {},
}

const ListItemVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.8,
      },
    },
  },
}

const BenefitCard = ({
  icon,
  title,
  description,
  list,
  delay = 0,
}: BenefitCardProps & {
  delay?: number
}) => {
  const [showList, setShowList] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="max-w-xs flex-1">
      <Fade delay={delay} y={10}>
        <div className="flex flex-1 flex-col items-stretch rounded-xl border-2 border-stone-50 py-6 px-12">
          <div className="flex flex-col items-center">
            <Scale delay={delay + 0.3}>
              <Scale withHover>
                <img src={icon} alt="" className="mb-4 w-14" />
              </Scale>
            </Scale>
            <h3 className="text-xl font-medium">{title}</h3>
          </div>

          <div className="flex min-h-[220px] pt-12 leading-6">
            {showList ? (
              <motion.ul
                variants={prefersReducedMotion ? {} : ListVariants}
                initial="initial"
                animate="animate"
                className="list-disc text-sm leading-6"
                transition={{
                  staggerChildren: prefersReducedMotion ? 0 : 0.1,
                }}
              >
                {list.map((item) => (
                  <motion.li key={item} variants={ListItemVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <Fade>
                <p className="text-sm">{description}</p>
              </Fade>
            )}
          </div>

          <div className="mx-auto flex w-full max-w-[120px]">
            <Button
              text={''}
              variant="rounded"
              fullWidth
              onClick={() => setShowList(!showList)}
            >
              {showList ? (
                <Fade inline x={3} key="list">
                  <span className="block w-7">
                    <ArrowLeftIcon />
                  </span>
                </Fade>
              ) : (
                <Fade inline key="details">
                  Details
                </Fade>
              )}
            </Button>
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default BenefitCard

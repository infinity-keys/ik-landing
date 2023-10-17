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
    <div className="w-full max-w-xs flex-1">
      <Fade delay={delay} y={10}>
        <div className="flex flex-1 flex-col items-stretch rounded-xl border-2 border-stone-50 bg-white/5 py-6 px-8 md:px-6">
          <div className="flex flex-col items-center">
            <Scale delay={delay + 0.3}>
              <Scale withHover>
                <img src={icon} alt="" className="mb-4 w-14" />
              </Scale>
            </Scale>
            <h3 className="text-xl font-medium">{title}</h3>
          </div>

          <div className="flex min-h-[220px] justify-center pt-12 pb-4 leading-6 md:pt-8 lg:pt-12">
            {showList ? (
              <motion.ul
                variants={prefersReducedMotion ? {} : ListVariants}
                initial="initial"
                animate="animate"
                className="max-w-[240px] list-disc pl-2 text-sm leading-6"
                transition={{
                  staggerChildren: prefersReducedMotion ? 0 : 0.05,
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
                <p className="max-w-[220px] text-center text-sm">
                  {description}
                </p>
              </Fade>
            )}
          </div>

          <div className="mx-auto flex w-full max-w-[120px]">
            <Button
              variant="rounded"
              fullWidth
              shadow={false}
              onClick={() => setShowList(!showList)}
            >
              {showList ? (
                <Fade inline x={3} key="list">
                  <span className="block w-6">
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

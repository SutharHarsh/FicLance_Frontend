"use client";

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

/* --------------------------------------------------------------------------
   STEPPER COMPONENT (UNCHANGED)
----------------------------------------------------------------------------*/

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  isStepValid = () => true,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep && isStepValid(currentStep)) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (isStepValid(currentStep)) {
      setDirection(1);
      updateStep(totalSteps + 1);
    }
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center"
      {...rest}
    >
      <div
        className={`mx-auto w-full rounded-2xl ${stepCircleContainerClassName}`}
      >
        <div
          className={`${stepContainerClassName} flex w-full items-center p-6`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      // Prevent skipping ahead if current step is invalid
                      if (clicked > currentStep && !isStepValid(currentStep))
                        return;

                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      // Prevent skipping ahead if current step is invalid
                      if (clicked > currentStep && !isStepValid(currentStep))
                        return;

                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-8 pb-8 ${footerClassName}`}>
            <div
              className={`mt-6 flex ${
                currentStep !== 1 ? "justify-between" : "justify-end"
              }`}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`duration-350 rounded px-4 py-2 transition text-neutral-600 hover:text-neutral-900 font-medium`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}

              <button
                onClick={isLastStep ? handleComplete : handleNext}
                disabled={!isStepValid(currentStep)}
                className={`duration-350 flex items-center justify-center rounded-full py-2 px-6 font-semibold tracking-tight transition shadow-md ${
                  !isStepValid(currentStep)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-700 dark:text-gray-400"
                    : "bg-[#2D3047] text-yellow-400 hover:bg-[#1f2133]"
                }`}
                {...nextButtonProps}
              >
                {isLastStep ? "Apply Filters" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? "50%" : "-50%", opacity: 0 }),
};

function Step({ children }) {
  return <div className="px-2">{children}</div>;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <motion.div
      onClick={() => !disableStepIndicators && onClickStep(step)}
      className="relative cursor-pointer outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#e5e7eb", color: "#9ca3af" },
          active: { scale: 1, backgroundColor: "#2D3047", color: "#fde047" },
          complete: { scale: 1, backgroundColor: "#2D3047", color: "#fde047" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-9 w-9 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-yellow-400" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-gray-300">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={{
          incomplete: { width: 0, backgroundColor: "rgba(0,0,0,0)" },
          complete: { width: "100%", backgroundColor: "#2D3047" },
        }}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   FILTER STEPPER (ONLY LOGIC CHANGED, UI SAME)
----------------------------------------------------------------------------*/

const DIFFICULTIES = ["Shuffle", "Beginner", "Intermediate", "Advanced"];
const DURATIONS = ["1-2 hours", "3-5 hours", "6-10 hours", "10+ hours"];

// ORIGINAL MAP KEPT
const SKILL_MAP = [
  "JavaScript",
  "React",
  "UI/UX",
  "CSS",
  "Node.js",
  "API",
  "HTML",
  "TypeScript",
  "Socket.io",
  "MongoDB",
];

// FLATTENED SKILLS (NO EXPANSION)
const FLAT_SKILLS = Array.from(
  new Set([
    // ...Object.keys(SKILL_MAP),
    ...Object.values(SKILL_MAP).flat(),
  ])
);

export default function FilterStepper({
  open = true,
  onClose,
  onApply = () => {},
  onComplete = () => {},
}) {
  const [difficulty, setDifficulty] = useState("All");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [duration, setDuration] = useState("Any duration");

  useEffect(() => {
    try {
      const d = localStorage.getItem("fp_difficulty");
      const s = JSON.parse(localStorage.getItem("fp_skills") || "null");
      const du = localStorage.getItem("fp_duration");

      if (d) setDifficulty(d);
      if (Array.isArray(s)) setSelectedSkills(s);
      if (du) setDuration(du);
    } catch {}
  }, [open]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFinish = () => {
    const filters = { difficulty, skills: selectedSkills, duration };
    localStorage.setItem("fp_difficulty", difficulty);
    localStorage.setItem("fp_skills", JSON.stringify(selectedSkills));
    localStorage.setItem("fp_duration", duration);
    onApply(filters);
    onComplete(filters);
    onClose?.();
  };

  // Validation function: returns true if the step is valid
  const validateStep = (step) => {
    if (step === 2) {
      // Step 2 (Skills) requires at least one skill selected
      return selectedSkills.length > 0;
    }
    return true; // Other steps are always valid
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-card to-card/10">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Filter Projects
            </h2>
            <p className="text-sm text-low-foreground mt-0.5">
              Customize your project search
            </p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <Stepper
            initialStep={1}
            onFinalStepCompleted={handleFinish}
            isStepValid={validateStep}
          >
            {/* STEP 1 */}
            <Step>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Select Difficulty Level
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {DIFFICULTIES.map((d) => {
                    const active = difficulty === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                          active
                            ? "bg-[#2D3047] border-[#2D3047] text-yellow-400 shadow-lg"
                            : "dark:bg-foreground/10 border-gray-200 dark:border-card-foreground text-foreground hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Step>

            {/* STEP 2 – SKILLS (FLAT, UI SAME) */}
            <Step>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Choose Technical Skills
                  </h3>
                  <p className="text-sm text-low-foreground">
                    Select technologies you want to work with
                  </p>
                </div>

                <div className="max-h-[120px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                  {FLAT_SKILLS.map((skill) => {
                    const selected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 mx-1 rounded-full text-sm font-medium border transition-all ${
                          selected
                            ? "bg-[#2D3047] border-[#2D3047] text-yellow-400"
                            : "bg-white dark:bg-card-foreground border-gray-300 dark:border-card dark:hover:bg-card-foreground/80 text-primary"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-gray-50 dark:bg-card rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
                    Selected ({selectedSkills.length})
                  </div>
                  <div className="text-sm text-low-foreground font-medium">
                    {selectedSkills.length
                      ? selectedSkills.join(", ")
                      : "No skills selected"}
                  </div>
                </div>
              </div>
            </Step>

            {/* STEP 3 */}
            <Step>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Project Duration
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {DURATIONS.map((d) => {
                    const active = duration === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                          active
                            ? "bg-[#2D3047] border-[#2D3047] text-yellow-400 shadow-lg"
                            : "bg-white dark:bg-card-foreground border-gray-200 dark:border-card-foreground text-foreground dark:hover:border-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
}

FilterStepper.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onApply: PropTypes.func,
  onComplete: PropTypes.func,
};

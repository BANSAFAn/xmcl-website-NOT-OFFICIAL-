
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <AnimatePresence>
        {(isHovered || isMobile) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur-xl"
          />
        )}
      </AnimatePresence>
      
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex h-auto w-full relative overflow-hidden transition-all duration-300",
          isMobile 
            ? "bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-1 flex-col" 
            : "bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-1 flex-row max-w-fit mx-auto hover:border-white/40 hover:shadow-2xl",
          className
        )}
        {...props}
      />
    </motion.div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const isMobile = useIsMobile();
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group border border-transparent",
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/25 data-[state=active]:via-blue-500/25 data-[state=active]:to-purple-500/25",
        "data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/30",
        "data-[state=active]:border-cyan-400/40",
        "hover:bg-gradient-to-r hover:from-white/10 hover:via-white/15 hover:to-white/10 hover:text-white hover:border-white/30",
        "text-white/70 font-medium",
        isMobile 
          ? "px-4 py-4 text-sm min-h-[56px] w-full mb-1 last:mb-0" 
          : "px-6 py-3 text-sm min-h-[44px] mx-0.5",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Dynamic background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-60"
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1 
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Floating particles effect */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: "100%",
                  opacity: 0 
                }}
                animate={{ 
                  y: "-10%", 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content container with enhanced animation */}
      <motion.div
        className={cn(
          "relative z-10 flex items-center gap-2 w-full",
          isMobile ? "justify-start" : "justify-center"
        )}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            // Icon (first element) with rotation animation
            if (index === 0) {
              return (
                <motion.div
                  className="flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  {child}
                </motion.div>
              );
            }
            // Text with typewriter effect on hover
            return (
              <motion.span
                className={cn(
                  "font-semibold whitespace-nowrap min-w-0",
                  isMobile ? "text-sm block" : "text-sm block"
                )}
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: 1,
                  textShadow: isHovered ? "0 0 8px rgba(56, 189, 248, 0.6)" : "none"
                }}
                transition={{ duration: 0.2 }}
              >
                {child}
              </motion.span>
            );
          }
          return child;
        })}
      </motion.div>
      
      {/* Enhanced active indicator */}
      <motion.div
        className={cn(
          "absolute bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full scale-x-0 group-data-[state=active]:scale-x-100",
          isMobile ? "left-1 top-1/2 -translate-y-1/2 w-1 h-10" : "bottom-0.5 left-1/2 transform -translate-x-1/2 w-10 h-0.5"
        )}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Pulsing glow effect for active state */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-data-[state=active]:opacity-100 blur-sm"
        animate={{ 
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-left",
        className
      )}
      {...props}
    />
  </motion.div>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

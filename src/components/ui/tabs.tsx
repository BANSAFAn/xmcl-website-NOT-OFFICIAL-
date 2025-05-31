
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-auto w-full relative overflow-hidden",
        isMobile 
          ? "bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-1 flex-col" 
          : "bg-gradient-to-r from-slate-900/70 via-slate-800/70 to-slate-900/70 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-1 flex-row max-w-fit mx-auto",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isMobile = useIsMobile();
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group border border-transparent",
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:via-blue-500/20 data-[state=active]:to-purple-500/20",
        "data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/20",
        "data-[state=active]:border-cyan-400/30",
        "hover:bg-gradient-to-r hover:from-white/5 hover:via-white/8 hover:to-white/5 hover:text-white hover:border-white/20",
        "text-white/70 font-medium",
        isMobile 
          ? "px-4 py-4 text-sm min-h-[56px] w-full mb-1 last:mb-0" 
          : "px-6 py-2.5 text-sm min-h-[40px] mx-0.5",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-50"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Content container */}
      <motion.div
        className={cn(
          "relative z-10 flex items-center gap-2 w-full",
          isMobile ? "justify-start" : "justify-center"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            // Icon (first element)
            if (index === 0) {
              return (
                <motion.div
                  className="flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {child}
                </motion.div>
              );
            }
            // Text (always show on mobile, show on desktop too but smaller)
            return (
              <motion.span
                className={cn(
                  "font-semibold whitespace-nowrap min-w-0",
                  isMobile ? "text-sm block" : "text-sm block"
                )}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {child}
              </motion.span>
            );
          }
          return child;
        })}
      </motion.div>
      
      {/* Active indicator */}
      <motion.div
        className={cn(
          "absolute bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full scale-x-0 group-data-[state=active]:scale-x-100",
          isMobile ? "left-1 top-1/2 -translate-y-1/2 w-1 h-8" : "bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5"
        )}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Glow effect for active state */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-data-[state=active]:opacity-100 blur-sm"
        transition={{ duration: 0.3 }}
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
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
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


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
        "inline-flex h-auto w-full bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative overflow-hidden",
        isMobile ? "p-1 flex-col" : "p-1.5 flex-row",
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
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/40 data-[state=active]:via-purple-600/40 data-[state=active]:to-cyan-600/40 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-gradient-to-r hover:from-white/10 hover:via-white/15 hover:to-white/10 hover:text-white text-white/80 overflow-hidden group border border-transparent data-[state=active]:border-blue-500/50 hover:border-white/30",
        isMobile 
          ? "px-4 py-4 text-sm font-medium min-h-[56px] w-full mb-1 last:mb-0" 
          : "px-4 py-3 text-sm font-medium min-h-[48px] flex-1 md:flex-none md:min-w-[120px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-60"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Content container */}
      <motion.div
        className={cn(
          "relative z-10 flex items-center gap-3 w-full",
          isMobile ? "justify-start" : "justify-center"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
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
            // Text (always show on mobile, show on hover/active on desktop)
            return (
              <motion.span
                className={cn(
                  "text-sm font-semibold whitespace-nowrap min-w-0",
                  isMobile ? "block" : "hidden md:block"
                )}
                initial={{ opacity: isMobile ? 1 : 0, width: isMobile ? "auto" : 0 }}
                animate={{ 
                  opacity: isMobile ? 1 : 1,
                  width: isMobile ? "auto" : "auto"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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
          "absolute bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full scale-x-0 group-data-[state=active]:scale-x-100",
          isMobile ? "left-1 top-1/2 -translate-y-1/2 w-1 h-8" : "bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1"
        )}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Glow effect for active state */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-xl opacity-0 group-data-[state=active]:opacity-100 blur-sm"
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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-left",
        className
      )}
      {...props}
    />
  </motion.div>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

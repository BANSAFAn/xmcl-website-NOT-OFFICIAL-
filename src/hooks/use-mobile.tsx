import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check for mobile devices using user agent as well as screen size
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ''
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT
      
      return isMobileDevice || isSmallScreen
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(checkMobile())
    }
    
    // Add event listeners for both resize and orientation change
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    window.addEventListener("orientationchange", onChange)
    
    // Initial check
    setIsMobile(checkMobile())
    
    // Cleanup
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
      window.removeEventListener("orientationchange", onChange)
    }
  }, [])

  return !!isMobile
}

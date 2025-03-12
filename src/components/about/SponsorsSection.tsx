
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function SponsorsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-20"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-10">Sponsors & Contributors</h2>
      
      <div className="prose prose-invert max-w-none">
        <div className="mb-10 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Sponsorship</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-2 text-center">
                    <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img 
                        src="https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66" 
                        alt="SignPath" 
                        className="h-16 mx-auto"
                      />
                    </a>
                  </td>
                  <td className="py-4 px-4 text-white/80">
                    Free code signing on Windows provided by <a href="https://signpath.io/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center">
                      SignPath.io <ExternalLink className="ml-1 h-3 w-3" />
                    </a>, certificate by <a href="https://signpath.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center">
                      SignPath Foundation <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-2 text-center">
                    <a href="https://deno.com/deploy" target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img 
                        src="https://deno.com/images/deno_logo_4.gif" 
                        alt="Deno Deploy" 
                        className="h-16 mx-auto"
                      />
                    </a>
                  </td>
                  <td className="py-4 px-4 text-white/80">
                    <a href="https://deno.com/deploy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center">
                      Deno Deploy <ExternalLink className="ml-1 h-3 w-3" />
                    </a>, XMCL leverage its hassle-free platform for serverless JavaScript applications. Provided by <a href="https://deno.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center">
                      Deno <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mb-10 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Sponsor (AFDIAN)</h3>
          
          <div className="flex flex-wrap items-center justify-start gap-2">
            <a title="爱发电用户_9d663: ￥390.00" href="https://afdian.net/u/9d663ec6fb6711ec9ace52540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="100" height="100" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/" alt="Sponsor" /> 
            </a>
            <a title="爱发电用户_19e29: ￥300.00" href="https://afdian.net/u/19e292c21a1d11ee929a52540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="100" height="100" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/" alt="Sponsor" /> 
            </a>
            <a title="ahdg: ￥180.00" href="https://afdian.net/u/dd9058ce20df11eba5c052540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="70" height="70" className="rounded-full" src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg" alt="Sponsor" /> 
            </a>
            <a title="Kandk: ￥30.00" href="https://afdian.net/u/404b86a078e111ecab3652540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png" alt="Sponsor" /> 
            </a>
            <a title="白雨 楠: ￥30.00" href="https://afdian.net/u/7f6ad7161b3e11eb8d0e52540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg" alt="Sponsor" /> 
            </a>
            <a title="圣剑: ￥30.00" href="https://afdian.net/u/ef50bc78b3d911ecb85352540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/user/user_upload_osl/8a1c4eb2e580b4b8b463ceb2114b6381_w132_h132_s3.jpeg" alt="Sponsor" /> 
            </a>
            <a title="同谋者: ￥30.00" href="https://afdian.net/u/7c3c65dc004a11eb9a6052540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-blue.png" alt="Sponsor" /> 
            </a>
            <a title="染川瞳: ￥5.00" href="https://afdian.net/u/89b1218c86e011eaa4d152540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/user/89b1218c86e011eaa4d152540025c377/avatar/9bf08f81d231f3054c98f9e5c1c8ce40_w640_h640_s57.jpg" alt="Sponsor" /> 
            </a>
            <a title="爱发电用户_CvQb: ￥5.00" href="https://afdian.net/u/177bea3cf47211ec990352540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png" alt="Sponsor" /> 
            </a>
            <a title="水合: ￥5.00" href="https://afdian.net/u/039508f2b17d11ebad1052540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-orange.png" alt="Sponsor" /> 
            </a>
            <a title="爱发电用户_0c5c8: ￥5.00" href="https://afdian.net/u/0c5c865e08ee11ecba1352540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/" alt="Sponsor" /> 
            </a>
            <a title="DIO: ￥5.00" href="https://afdian.net/u/7ac297b4722211eab4a752540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png" alt="Sponsor" /> 
            </a>
            <a title="爱发电用户_DJpu: ￥5.00" href="https://afdian.net/u/8c23a236cf7311ec9c3452540025c377" target="_blank" rel="noopener noreferrer"> 
              <img width="50" height="50" className="rounded-full" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png" alt="Sponsor" /> 
            </a>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Credit</h3>
          
          <ul className="space-y-2 text-white/80">
            <li><strong>BANER</strong>, who helps me a lot on the RU/UK community.</li>
            <li><strong>GodLeaveMe</strong>, <strong>v1mkss</strong>, maintaining the AUR package registry.</li>
            <li><strong>0xc0000142</strong>, maintaining the winget.</li>
            <li><strong>Marmur2020</strong> & <strong>BANSAFAn</strong>, completely translated a Ukrainian language!</li>
            <li><strong>vanja-san</strong>, provided Russian language!</li>
            <li><strong>lukechu10</strong> & <strong>HoldYourWaffle</strong> helps me on Launcher core.</li>
            <li><strong>laolarou726</strong>, who helps a lot on launcher design.</li>
          </ul>
          
          <p className="mt-4 text-white/80">Also, special thanks to</p>
          
          <p className="mt-2 text-white/80">
            <strong>Yricky</strong>, <strong>Jin</strong>, <strong>LG</strong>, <strong>Phoebe</strong>, <strong>Sumeng Wang</strong>, <strong>Luca</strong>, <strong>Charles Tang</strong>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

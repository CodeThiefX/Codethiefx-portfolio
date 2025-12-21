import React from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { socials } from '#constants'

const Contact = () => {
  return (
    <>
        <div id='window-header'>    
            <WindowControls target="contact" />
            <h2>Contact Me</h2>
        </div>

        <div className='p-8 space-y-6'>
            <div className='flex items-center gap-5'>
                <img src="/images/adrian.jpg" alt="Codetheifx" className='w-24 h-24 rounded-full object-cover ring-4 ring-blue-100 shadow-lg transition-transform duration-300 hover:scale-105 hover:ring-blue-200' />
                <div className='flex flex-col gap-1'>
                    <h3 className='text-2xl font-bold text-gray-800'>Let's Connect</h3>
                    <p className='text-gray-500 text-sm font-medium'>Open for opportunities & collaborations</p>
                </div>
            </div>

            <div className='h-px bg-gray-200'></div>

            <div className='bg-blue-50 rounded-xl p-5 border border-blue-100/50'>
                <p className='text-gray-600 leading-relaxed text-sm'>💡 Got an idea? A bug to squash? Or just want to talk tech? I'm always excited to connect with fellow developers and creators. Let's build something amazing together!</p>
            </div>

            <div className='flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group'>
                <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs text-gray-400 uppercase tracking-wider font-medium'>Email</span>
                    <p className='text-gray-700 font-semibold group-hover:text-blue-600 transition-colors'>Codetheifx@gmail.com</p>
                </div>
            </div>

            <ul className='grid grid-cols-2 gap-3'>
                {socials.map(({id, bg, link, icon, text}) => (
                    <li key={id} className='rounded-xl p-4 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl' style={{ backgroundColor: bg }}>
                        <a 
                            href={link} 
                            target='_blank' 
                            rel='noreferrer noopener' 
                            title={text}
                            className='flex items-center gap-4'
                        >
                            <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm'>
                                <img src={icon} alt={text} className='w-5 h-5 brightness-0 invert' />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-white/70 text-xs font-medium'>Follow on</span>
                                <p className='font-bold text-sm text-white'>{text}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, 'contact')

export default ContactWindow;
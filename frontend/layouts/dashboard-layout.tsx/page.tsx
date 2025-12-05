// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown, Bell, User, Settings, LogOut } from 'lucide-react';

// // --- Static Data Simulation ---
// const mainNavItems = [
//   'Employee', 'Payroll', 'Leave', 'Workflow', 'Reports', 'Others'
// ];

// const sidebarItems = [
//   { icon: 'Main', label: 'Main', path: '/hr/main', children: true },
//   { icon: 'Overview', label: 'Overview', path: '/hr/dashboard', children: false },
//   { icon: 'Info', label: 'Information', path: '/hr/info', children: true },
//   { icon: 'Input', label: 'Payroll Inputs', path: '/hr/payroll-inputs', children: true },
//   { icon: 'Process', label: 'Process', path: '/hr/process', children: false },
//   { icon: 'Verify', label: 'Verify', path: '/hr/verify', children: false },
//   { icon: 'Payout', label: 'Payout', path: '/hr/payout', children: false },
//   { icon: 'Published', label: 'Published Info', path: '/hr/published', children: false },
//   { icon: 'Admin', label: 'Admin', path: '/hr/admin', children: false },
//   { icon: 'Setup', label: 'Setup', path: '/hr/setup', children: false },
// ];

// const SidebarIcon = ({ icon, className = "h-5 w-5" }:any) => {
//     switch (icon) {
//         case 'Main': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l-7-7m7 7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
//         case 'Overview': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>;
//         case 'Info': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
//         case 'Input': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>;
//         case 'Process': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1z"></path></svg>;
//         case 'Verify': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.382a3 3 0 00-4.243-4.243L10.559 10.559a2 2 0 01-1.414.586H8a2 2 0 00-2 2v2.021l-.037.006A2 2 0 013 15.657V18a2 2 0 002 2h14a2 2 0 002-2v-2.343a2 2 0 01-.037-.006L18 13.979v-2.021a2 2 0 012-2h1.414a3 3 0 00-.707-.707z"></path></svg>;
//         case 'Payout': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.115 0 2.08.354 2.89.967M12 8v8m-3-8h6"></path></svg>;
//         case 'Published': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 002 2zm0 0a2 2 0 01-2-2m2 2a2 2 0 00-2-2m0-16V6a2 2 0 00-2-2H5m2-2h3"></path></svg>;
//         case 'Admin': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.298.653 3.35.055z"></path></svg>;
//         case 'Setup': return <Settings className={className} />;
//         default: return <div className={className}></div>;
//     }
// };


// const NavItem = ({ label, children, active }:any) => (
//     <div className={`flex items-center justify-between p-3 cursor-pointer text-sm transition duration-150 ease-in-out ${active ? 'bg-teal-800 text-white font-semibold' : 'hover:bg-teal-600 hover:text-white'}`}>
//         <div className="flex items-center space-x-3">
//             <SidebarIcon icon={label.split(' ')[0]} className="h-5 w-5" />
//             <span>{label}</span>
//         </div>
//         {children && <ChevronDown className="h-4 w-4 transform rotate-270" />}
//     </div>
// );

// // --- Header Component ---
// const Header = () => (
//     <header className="flex items-center justify-between bg-gray-800 text-white shadow-lg h-14 px-4 sm:px-6">
//         {/* Left Side: Logo and Main Nav */}
//         <div className="flex items-center space-x-6">
//             {/* Custom Branding: HRM Tool */}
//             <div className="text-xl font-bold tracking-wider text-white">
//                 <span className="text-lime-400">HRM</span> Tool
//             </div>
//             <nav className="hidden md:flex space-x-6 h-full">
//                 {mainNavItems.map(item => (
//                     <a 
//                         key={item} 
//                         href="#" 
//                         className={`text-sm font-medium pt-5 pb-4 transition duration-150 ${item === 'Payroll' ? 'border-b-4 border-lime-400 text-lime-300' : 'hover:text-gray-300'}`}
//                     >
//                         {item}
//                     </a>
//                 ))}
//             </nav>
//         </div>

//         {/* Right Side: Actions and User */}
//         <div className="flex items-center space-x-3">
//             <div className="relative hidden sm:block">
//                 <select className="bg-gray-700 text-white text-sm p-1.5 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none appearance-none pr-6">
//                     <option>Apr 2015</option>
//                     <option>May 2015</option>
//                     <option>Jun 2015</option>
//                 </select>
//                 <ChevronDown className="h-4 w-4 absolute right-1.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" />
//             </div>
//             <Bell className="h-6 w-6 cursor-pointer hover:text-lime-400 hidden sm:block" />
//             <User className="h-6 w-6 cursor-pointer hover:text-lime-400" />
//             <Menu className="h-6 w-6 md:hidden cursor-pointer hover:text-lime-400" />
//         </div>
//     </header>
// );


// // --- Sidebar Component ---
// const Sidebar = ({ isOpen, toggleSidebar }:any) => (
//     <>
//         {/* Mobile Overlay */}
//         {isOpen && (
//             <div 
//                 className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
//                 onClick={toggleSidebar}
//             ></div>
//         )}

//         {/* Sidebar */}
//         <aside className={`
//             h-full bg-teal-700 text-white shadow-xl flex flex-col w-56
//             md:relative md:translate-x-0
//             fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
//             ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}>
//             <div className="flex-1 overflow-y-auto pt-4">
//                 {sidebarItems.map((item, index) => (
//                     <div key={index}>
//                         <NavItem 
//                             label={item.label} 
//                             children={item.children} 
//                             active={item.label === 'Overview'} // Hardcoded active for this demo
//                         />
//                         {item.label === 'Overview' && (
//                             <div className="pl-4 py-1 text-sm bg-teal-800/50 text-white">
//                                 <span className="text-xs opacity-75">Basic | Advanced</span>
//                             </div>
//                         )}
//                         {item.label === 'Setup' && (
//                             <div className="pl-4 py-1 text-sm bg-teal-800/50 text-white mt-auto">
//                                 <span className="text-xs opacity-75">Basic | Advanced</span>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
            
//             {/* Close button for mobile */}
//             <button 
//                 onClick={toggleSidebar} 
//                 className="absolute top-2 right-2 md:hidden p-2 text-white bg-teal-800 rounded-full hover:bg-red-500"
//                 aria-label="Close menu"
//             >
//                 <X className="h-5 w-5" />
//             </button>
//         </aside>
//     </>
// );


// // --- Main Dashboard Layout Component ---
// const DashboardLayout = ({ children }:any) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     // Close sidebar on desktop automatically
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768) { // md breakpoint
//                 setIsSidebarOpen(false);
//             }
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return (
//         <div className="flex flex-col h-screen overflow-hidden">
//             <Header />
//             <div className="flex flex-1 overflow-hidden">
//                 <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//                 <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
//                     <button 
//                         onClick={toggleSidebar} 
//                         className="md:hidden mb-4 p-2 bg-teal-700 text-white rounded-lg shadow-md hover:bg-teal-600 transition"
//                     >
//                         <Menu className="h-6 w-6" />
//                     </button>
//                     {children}
//                 </main>
                
//                 {/* Fixed Self Help Button */}
//                 <button className="fixed top-1/2 right-0 transform -translate-y-1/2 rotate-90 origin-top-right bg-lime-500 text-gray-800 font-bold py-2 px-6 rounded-t-lg shadow-2xl z-20 transition duration-150 hover:bg-lime-400 focus:outline-none hidden sm:block">
//                     Self Help
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;

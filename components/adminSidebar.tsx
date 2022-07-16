import {signOut} from "next-auth/react"
import AdminSidebarEntry from "./adminSidebarEntry";
import {Home} from "tabler-icons-react";

export default function AdminSidebar() {

    return (
        <>
            <div className="w-64 py-4 px-3 bg-gray-50">
                <a className="flex items-center pl-2.5 mb-5">
                    <img src="/cropped-wglogo-512x512.png" className="mr-3 h-6 sm:h-7" alt="WG Logo"/>
                    <span
                        className="self-center text-xl font-semibold whitespace-nowrap">AG-Verwaltung</span>
                </a>
                <div className="grid-cols-1 gap-4 content-start space-y-2">
                    <AdminSidebarEntry link="/admin" name="Dashboard" addition=""
                                       icon={<svg className="w-6 h-6 text-gray-500 transition duration-75 "
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                  </svg>}
                    />
                    <AdminSidebarEntry link="/admin/overview" name="Übersicht" addition={<span
                        className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">yea</span>}
                                       icon={<svg
                                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                      fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                  </svg>}
                    />
                    <AdminSidebarEntry link="/admin" name="Exportieren"
                                       addition={<span
                                      className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                                  }
                                       icon={<svg
                                      className="sflex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                      fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"/>
                                      <path
                                          d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/>
                                  </svg>}
                    />

                    <div className="mt-8 p-2 border-t border-gray-200">
                        <button className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                                onClick={() => signOut()}>
                            <svg
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                      clipRule="evenodd"/>
                            </svg>
                            <span className="ml-4">Logout</span>
                        </button>
                    </div>
                    <AdminSidebarEntry link="/" name="Startseite" addition=""
                                       icon={<Home/>}
                    />
                </div>

            </div>
        </>
    )
}
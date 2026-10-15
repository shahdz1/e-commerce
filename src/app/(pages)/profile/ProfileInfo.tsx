"use client";

import { useEffect, useState } from "react";
import PagesTitle from "@/app/_SharedComponent/pagesTitle/PagesTitle";
import { IoIosArrowForward, IoMdSettings } from "react-icons/io";
import { MdPlace } from "react-icons/md";
import type { IAddress } from "@/interface/address.interface";
import AddressesSection from "./AddressesSection";
import SettingsSection from "./SettingsSection";

export default function ProfileInfo({ addresses }: { addresses: IAddress[] }) {
    const [activeSection, setActiveSection] = useState<"addresses" | "settings">("addresses");

    useEffect(() => {
        if (sessionStorage.getItem("profile-active-section") === "settings") {
            setActiveSection("settings");
        }
    }, []);

    function changeSection(section: "addresses" | "settings") {
        setActiveSection(section);
        sessionStorage.setItem("profile-active-section", section);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PagesTitle title={"My Account"} subTitle={"Manage your addresses and account settings"} sectionName={"My Account"} />
            <div className="mx-auto container px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="w-full lg:w-72 shrink-0">
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-4">
                                <h2 className="font-bold text-gray-900">My Account</h2>
                            </div>
                            <ul className="p-2">
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => changeSection("addresses")}
                                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 duration-200 ${activeSection === "addresses" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700"}`}
                                    >
                                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg duration-200 ${activeSection === "addresses" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}><MdPlace /></div>
                                        <span className="flex-1 font-medium">My Addresses</span>
                                        <IoIosArrowForward />
                                    </button>
                                </li>
                                <li className="mt-2">
                                    <button
                                        type="button"
                                        onClick={() => changeSection("settings")}
                                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 duration-200 ${activeSection === "settings" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700"}`}
                                    >
                                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg duration-200 ${activeSection === "settings" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}><IoMdSettings /></div>
                                        <span className="flex-1 font-medium">Settings</span>
                                        <IoIosArrowForward />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        {activeSection === "addresses" ? (
                            <AddressesSection addresses={addresses} />
                        ) : (
                            <SettingsSection />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

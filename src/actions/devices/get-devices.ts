"use server"

import { getAllDevicesFn } from "@/services";

export const getDevices = async () => {
    try {
        const devices = await getAllDevicesFn()
        console.log(devices)

        return devices;
    } catch (error) {
        console.log(error);
        return [];
    }
}
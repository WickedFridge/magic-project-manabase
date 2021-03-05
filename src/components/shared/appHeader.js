import React from "react";
import {useCurrentWitdh} from "../../utils/width";
import MobileHeader from "../mobile/mobileHeader";
import DesktopHeader from "../desktop/desktopHeader";

export default function AppHeader() {

    let width = useCurrentWitdh();
    const isMobile = width <= 500;

    return isMobile ? <MobileHeader/> : <DesktopHeader/>
}

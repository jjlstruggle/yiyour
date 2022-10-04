import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import useLazy from "@/hooks/useLazy";
const Call = useLazy(import("@/components/user/call"));
const Wx = useLazy(import("@/components/user/wx"));
function AccountEdit({ asyncUserInfo }) {
  return (
    <div className="flex flex-col">
      <Call asyncUserInfo={asyncUserInfo} />
      <Wx asyncUserInfo={asyncUserInfo} />
    </div>
  );
}
export default AccountEdit;

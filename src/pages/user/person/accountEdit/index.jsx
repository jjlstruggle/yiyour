import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import useLazy from "@/hooks/useLazy";
const Call = useLazy(import("@/components/user/call"));
const Wx = useLazy(import("@/components/user/wx"));
const Pwd = useLazy(import("@/components/user/pwd"));
function AccountEdit() {
  return (
    <div className="flex flex-col">
      <Call />
      <Wx />
      <Pwd />
    </div>
  );
}
export default AccountEdit;

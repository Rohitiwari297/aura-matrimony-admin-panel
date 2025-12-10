import { LockKeyhole } from 'lucide-react';
import React, { useState } from 'react'
import { changePass } from '../important_Links/api';
import { token } from '../important_Links/url.js';


function ChangePassword() {

    // State for the new password and confirm password
    // const [newPassword, setNewPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordDetails, setPasswordDetails] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    // console.log( 'hee:',passwordDetails);
    
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = passwordDetails;
        //validations
        if(newPassword !== confirmPassword){
            alert('Confirm passwords do not match');
            return
        }
        if(newPassword === oldPassword){
            alert('New password cannot be same as old password');
            return
        }
        if(newPassword.length < 8){
            alert('Password must be at least 8 characters long');
            return
        }

        try {
            const res = await changePass(token, passwordDetails )
            alert(res.message);
            // console.log('wert',res);
            //reset the form
            setPasswordDetails({
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            });

        } catch (err) {
            console.error(err);
            alert(err.response.data.message);

        }
    };

 return (
    <div className="flex flex-col items-center justify-center p-5 border border-gray-600 w-full h-fit rounded-xl">
      <div className="bg-gray-800 w-[400px] max-w-md h-[400px] shadow-xl rounded-xl p-8 space-y-6">

        {/* Header */}
        <div className=" flex justify-center items-center">
            <div className=" flex justify-center items-center p-3 bg-gray-900 text-white  border border-gray-100 w-fit rounded-xl hover: -mt-13 hover:animate-bounce hover:rotate-[360deg]">
                <LockKeyhole size={20} />
            </div>
        </div>

        <div className='flex justify-center items-center -mt-5'>
          <h1 className="text-[15px]  font-semibold text-gray-100">
            Change Password
          </h1>

        </div>
        

        {/* Form */}
        <div className="space-y-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-gray-100 font-medium">Old Password</label>
            <input
              type="password"
              placeholder="Enter old password"
              className="border border-gray-300 text-black bg-gray-50 px-3 py-2 rounded-lg focus:outline-none focus:border-gray-900"
              value={passwordDetails.oldPassword}
              onChange={(e) => setPasswordDetails({ ...passwordDetails, oldPassword: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-100 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="border border-gray-300 text-black bg-gray-50 px-3 py-2 rounded-lg focus:outline-none focus:border-gray-900"
              value={passwordDetails.newPassword}
              onChange={(e) => setPasswordDetails({ ...passwordDetails, newPassword: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-100 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="border border-gray-300 text-black bg-gray-50 px-3 py-2 rounded-lg focus:outline-none focus:border-gray-900"
              value={passwordDetails.confirmPassword}
              onChange={(e) => setPasswordDetails({ ...passwordDetails, confirmPassword: e.target.value })}
            />
          </div>
        </div>

        {/* Button */}
        <button onClick={handlePasswordChange} className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
          Update Password
        </button>

      </div>
    </div>
  );
}

export default ChangePassword
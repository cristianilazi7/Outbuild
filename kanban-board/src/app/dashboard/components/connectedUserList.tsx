"use strict";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const ConnectedUsersList: React.FC = () => {
    const connectedUsers = useSelector((state: RootState) => state.user.connectedUsers || []);
    return (
        <div className="bg-white p-4 rounded shadow-md max-h-64 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Connected Users</h2>
      {connectedUsers.length > 0 ? (
        <ul className="space-y-2">
          {connectedUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <span className="font-medium">{user.email}</span>
                {user.lastSeen && (
                <span className="text-xs text-gray-500">
                    Last seen: {typeof user.lastSeen === 'number' 
                    ? new Date(user.lastSeen * 1000).toLocaleString() 
                    : new Date(Date.parse(user.lastSeen)).toLocaleString()}
                </span>
                )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No users connected</p>
      )}
    </div>
    )
};

export default ConnectedUsersList;
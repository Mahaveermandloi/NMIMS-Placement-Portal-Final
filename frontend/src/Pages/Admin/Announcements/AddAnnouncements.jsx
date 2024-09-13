import React, { useState } from 'react';
import CompanyVisitAnnouncement from './Tabs/CompanyVisitAnnouncement';
import TrainingandWorkshopAnnouncement from './Tabs/TrainingandWorkshopAnnouncement';
import PlacementPolicyUpdateAnnouncement from './Tabs/PlacementPolicyUpdateAnnouncement';

const AnnouncementTabs = () => {
  const [activeTab, setActiveTab] = useState('company-visit');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company-visit':
        return <CompanyVisitAnnouncement />;
      case 'training-workshop':
        return <TrainingandWorkshopAnnouncement />;

      default:
        return null;
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Add Announcement</h2>
      <div className="mb-4">
        <div className="flex  border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'company-visit'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('company-visit')}
          >
            Company Visit Announcement
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'training-workshop'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('training-workshop')}
          >
            Training and Workshop Announcement
          </button>
        
        </div>
      </div>

      <div className="mt-2 w-1/2 ">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AnnouncementTabs;

export const HOME_CAMPAIGN_DISMISSED_EVENT = "rudhra:home-campaign-dismissed";
export const HOME_CAMPAIGN_OPENED_EVENT = "rudhra:home-campaign-opened";

let campaignPending = true;

export const isHomeCampaignPending = () => campaignPending;

export const completeHomeCampaign = () => {
  campaignPending = false;
  window.dispatchEvent(new Event(HOME_CAMPAIGN_DISMISSED_EVENT));
};

export const openHomeCampaign = () => {
  window.dispatchEvent(new Event(HOME_CAMPAIGN_OPENED_EVENT));
};

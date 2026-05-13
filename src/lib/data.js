"use server";

import { fetchInstance } from "../utils/fetch";

export const getProfile = async () => {
  try {
    const res = await fetchInstance("/users/profile", {
      method: "GET",
      withAuth: true,
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const updateProfile = async (data) => {
  try {
    // FormData kontrolü
    const isFormData = data instanceof FormData;

    const options = {
      method: "PUT",
      body: isFormData ? data : JSON.stringify(data),
    };

    // FormData değilse Content-Type header'ını ekle
    if (!isFormData) {
      options.headers = {
        "Content-Type": "application/json",
      };
    }

    const res = await fetchInstance("/users/profile", options);

    return res;
  } catch (error) {
    console.error("Profile update error:", error);
    return null;
  }
};

export const getTeamMembers = async () => {
  try {
    const response = await fetchInstance("/team");
    return response.data;
  } catch (error) {
    console.error("Team members fetch error:", error);
    return { data: [], message: "Team members could not be loaded" };
  }
};

export const getTeamMemberByUsername = async (username) => {
  try {
    const response = await fetchInstance(`/team/${username}`);
    return response.data;
  } catch (error) {
    console.error("Team member fetch error:", error);
    return { data: null, message: "Team member could not be loaded" };
  }
};

export const getAvailableAuthors = async () => {
  try {
    const response = await fetchInstance("/users/available-authors");
    return response;
  } catch (error) {
    console.error("Available authors fetch error:", error);
    return { data: [], message: "Available authors could not be loaded" };
  }
};

export const getAuthorById = async (id) => {
  try {
    const response = await fetchInstance(`/users/author/${id}`);
    return response;
  } catch (error) {
    console.error("Author fetch error:", error);
    return { data: null, message: "Author could not be loaded" };
  }
};

export const getAllSpecialFile = async () => {
  const res = await fetchInstance("/special-files", {
    method: "GET",
  });

  return res.specialFiles;
};

export const getSpecialFileById = async (id) => {
  const res = await fetchInstance(`/special-files/${id}`, {
    method: "GET",
  });

  return res;
};

export const getUpcomingEvents = async () => {
  try {
    const res = await fetchInstance(`/events/upcoming`, {
      method: "GET",
    });

    return res;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return { data: [], message: "Upcoming events could not be loaded" };
  }
};

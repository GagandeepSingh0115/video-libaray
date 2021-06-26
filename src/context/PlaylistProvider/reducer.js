import { uuidv4 } from "utils";
export const initialPlaylist = [
  { _id: uuidv4(), name: "My playlist", description: "", videos: [] },
];

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER_PLAYLIST":
      return action.payload;
    case "TOOGLE_VIDEO_FROM_PLAYLIST":
      const selectedPlaylist = state.find(
        (playlist) => playlist._id === action.payload.playlistId
      );
      if (!!selectedPlaylist) {
        const isVideoPresent = selectedPlaylist.videos.find(
          (video) => video._id === action.payload.video._id
        );
        if (!isVideoPresent) {
          return state.map((playlist) =>
            playlist._id === action.payload.playlistId
              ? {
                  ...playlist,
                  videos: playlist.videos.concat(action.payload.video),
                }
              : playlist
          );
        } else {
          return state.map((playlist) =>
            playlist._id === action.payload.playlistId
              ? {
                  ...playlist,
                  videos: playlist.videos.filter(
                    (video) => video._id !== action.payload.video._id
                  ),
                }
              : playlist
          );
        }
      }
      return state;
    case "REMOVE_PLAYLIST":
      return state.filter((playlist) => playlist._id !== action.payload);
    case "CREATE_PLAYLIST":
      return state.concat([action.payload]);
    case "EDIT_DESCRIPTION":
      return state.map((playlist) =>
        playlist._id === action.payload.playlistId
          ? { ...playlist, description: action.payload.description }
          : playlist
      );
    default:
      return state;
  }
};

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using QuestomAssets.Models;

namespace BeatOn.ClientModels
{
    [Message(MessageType.MovePlaylist)]
    public class ClientMovePlaylist : MessageBase
    {
        public string PlaylistID { get; set; }
        public int Index { get; set; }
    }
}
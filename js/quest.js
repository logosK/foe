
Quests = {};
Quests.Type = {
	NotStarted : 0,
	Visible    : 1,
	Completed  : 2,
	All        : 3,
	Failed     : 4
};

Quest = function(opts) {
	opts = opts || {};
	this.name   = opts.name   || "FAIL";
	this.desc   = opts.desc   || "NO DESC";
	this.active = opts.active || function() { return Quests.Type.NotStarted; };
	this.list   = opts.list   || [];
};
Quest.prototype.Print = function() {
	var name = isFunction(this.name) ? this.name() : this.name;
	Text.Add("<b>"+name+"</b>");
	Text.NL();
	var desc = isFunction(this.desc) ? this.desc() : this.desc;
	Text.Add(desc);
	Text.NL();
	var list = this.list;
	if(list.length > 0) {
		Text.Add("<ul>");
		for(var i=0,j=list.length; i<j; ++i) {
			var item = list[i];
			item.Print();
		}
		Text.Add("</ul>");
	}
}

QuestItem = function(opts) {
	opts = opts || {};
	this.desc   = opts.desc   || "NO DESC";
	this.active = opts.active;
};
QuestItem.prototype.Print = function() {
	var active = this.active ? this.active() : Quests.Type.Visible;
	if((active & Quests.Type.Visible) || DEBUG) {
		Text.Add("<li>");
		if(active & Quests.Type.Completed)
			Text.Add("<del>");
		if(active & Quests.Type.Failed)
			Text.Add("<font color ='red'><del>");
		
		var desc = isFunction(this.desc) ? this.desc() : this.desc;
		if(isFunction(desc))
			desc();
		else
			Text.Add(desc);
		
		if(active & Quests.Type.Completed)
			Text.Add("</del>");
		if(active & Quests.Type.Failed)
			Text.Add("</del></font>");
		Text.Add("</li>");
	}
}

Quests.quests  = [];
Quests.curType = Quests.Type.Visible;

Quests.Print = function() {
	var numQs = 0;
	for(var i=0, j=Quests.quests.length; i<j; ++i) {
		var q = Quests.quests[i];
		var active = q.active() & Quests.curType;
		if(active || DEBUG) {
			numQs++;
			Text.Add("<hr>");
			if(!active)
				Text.Add("<font color ='gray'>");
			
			q.Print();
			
			if(!active)
				Text.Add("</font>");
		}
	}
	if(numQs > 0)
		Text.Add("<hr>");
	else {
		Text.Add(Text.BoldColor("No active quests."));
	}
	Text.Flush();
	
	var options = new Array();
	options.push({ nameStr : "Active",
		func : function() {
			Text.Clear();
			Quests.curType = Quests.Type.Visible;
			Quests.Print();
		}, enabled : Quests.curType != Quests.Type.Visible
	});
	options.push({ nameStr : "Completed",
		func : function() {
			Text.Clear();
			Quests.curType = Quests.Type.Completed;
			Quests.Print();
		}, enabled : Quests.curType != Quests.Type.Completed
	});
	options.push({ nameStr : "All",
		func : function() {
			Text.Clear();
			Quests.curType = Quests.Type.All;
			Quests.Print();
		}, enabled : Quests.curType != Quests.Type.All
	});
	Gui.SetButtonsFromList(options, false, null);
	
	SetExploreButtons();
}


/*************************
 * Actual list of quests *
 *************************/

Quests.quests.push(new Quest({
	name: "Dark agenda",
	desc: function() {
		return "Prepare Eden against the coming of Uru.";
	},
	active: function() {
		var status = Quests.Type.NotStarted;
		status |= Quests.Type.Visible;
		return status;
	},
	list: [
		new QuestItem({
			desc: function() {
				if((rosalin.flags["Met"] == 0 ||
				    gameCache.flags["LearnedMagic"] != 0) &&
				    jeanne.flags["Met"] == 0)
					return "Find someone to help you figure out what the gem does.";
				else
					return "Talk with the court magician about the gem and figure out what it does.";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				status |= Quests.Type.Visible;
				if(jeanne.flags["Met"] != 0)
					status |= Quests.Type.Completed;
				return status;
			}
		}),
		new QuestItem({
			desc: function() {
				return "Seek the aid of Mother Tree in the Dryad's Glade, deep within the forest.";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				if(jeanne.flags["Met"] != 0)
					status |= Quests.Type.Visible;
				if(glade.flags["Visit"] >= 2)
					status |= Quests.Type.Completed;
				return status;
			}
		}),
		new QuestItem({
			desc: function() {
				return "Meet Jeanne at the mound near the Crossroads in order to activate the gem.";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				if(glade.flags["Visit"] >= 2)
					status |= Quests.Type.Visible;
				//TODO
				return status;
			}
		})
	]
}));



Quests.quests.push(new Quest({
	name: "Big city",
	desc: function() {
		if(rigard.Access())
			return "Get access to the royal grounds.";
		else
			return "Find a way inside the city of Rigard. You'll need to get a pass to enter... only question is how to get one.";
	},
	active: function() {
		var status = Quests.Type.NotStarted;
		if(rigard.RoyalAccess())
			status |= Quests.Type.Completed;
		else if(miranda.flags["Met"] >= Miranda.Met.Met)
			status |= Quests.Type.Visible;
		return status;
	},
	list: [
		new QuestItem({
			desc: function() {
				if(rigard.Access())
					return "Get inside the outer walls.";
				else
					return "Get a pass to the city. You could probably get one by gaining the trust of one of the farmers of the plains. Miranda, the guardswoman, is probably also able to help you get one. If all else fails, you've heard that the outlaws in the forest have infiltrated the city... there must be some sort of secret entrance.";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				status |= Quests.Type.Visible;
				if(rigard.Access())
					status |= Quests.Type.Completed;
				return status;
			}
		}),
		new QuestItem({
			desc: function() {
				return "Find a way to get past the inner walls.";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				if(rigard.Access())
					status |= Quests.Type.Visible;
				if(rigard.RoyalAccess())
					status |= Quests.Type.Completed;
				return status;
			}
		})
	]
}));



Quests.quests.push(new Quest({
	name: function() {
		return "Seeking favor";
	},
	desc: function() {
		return "Investigate the noble couple you saw sneaking out of the inner district. You probably ought to figure out why they were followed.";
	},
	active: function() {
		var status = Quests.Type.NotStarted;
		if(rigard.RoyalAccess())
			status |= Quests.Type.Completed;
		else if(rigard.flags["RoyalAccessTalk"] >= 1)
			status |= Quests.Type.Visible;
		return status;
	},
	list: [
		new QuestItem({
			desc: function() {
				return "Investigate what became of the noble couple and their stalker. Perhaps seek them at the inn?";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				if(twins.flags["Met"] >= Twins.Met.Met)
					status |= Quests.Type.Completed;
				status |= Quests.Type.Visible;
				return status;
			}
		}),
		new QuestItem({
			desc: function() {
				return "Heed the noble couple's request by humiliating Lord Krawitz.";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				if(twins.flags["Met"] >= Twins.Met.Met)
					status |= Quests.Type.Visible;
				if(rigard.RoyalAccess())
					status |= Quests.Type.Completed;
				return status;
			}
		})
	]
}));

//TODO Krawitz, Terry, Burrows, Gwendy

/*
 * 

Quests.quests.push(new Quest({
	name: function() {
		return "Seeking favor";
	},
	desc: function() {
		return "Investigate the noble couple you saw sneaking out of the inner district. You probably ought to figure out why they were followed.";
	},
	active: function() {
		var status = Quests.Type.NotStarted;
		if(rigard.RoyalAccess())
			status |= Quests.Type.Completed;
		else if(rigard.flags["RoyalAccessTalk"] >= 1)
			status |= Quests.Type.Visible;
		return status;
	},
	list: [
		new QuestItem({
			desc: function() {
				if(rigard.Access())
					return "";
				else
					return "";
			},
			active: function() {
				var status = Quests.Type.NotStarted;
				status |= Quests.Type.Visible;
				if(rigard.Access())
					status |= Quests.Type.Completed;
				return status;
			}
		})
	]
}));

 */
rm(list = ls())

phrases <- read.csv('~/babymama/babymamahist/csv/bmTops.csv')
head(phrases)
unique(phrases$n)

# number of n-grams to analyze
n = dim(phrases)[1]

bmData <- data.frame(
  phrase = phrases$phrase, 
  category = phrases$n,
  c2004 = numeric(n),
  c2005 = numeric(n),
  c2006 = numeric(n),
  c2007 = numeric(n),
  c2008 = numeric(n),
  c2009 = numeric(n),
  c2010 = numeric(n),
  c2011 = numeric(n),
  c2012 = numeric(n),
  c2013 = numeric(n),
  c2014 = numeric(n),
  c2015 = numeric(n),
  c2016 = numeric(n))
head(bmData)

years <- 2004:2016

for (yr in years) {
  bmCol <- paste('c', yr, sep = '')
  for (i in 1:n) {
    phrase <- bmData$phrase[i]
    phrase <- strsplit(as.character(phrase), ' ')[[1]]
    type <- bmData$category[i]

    # unigrams
    if (type %in% c('1', 'n', 'o', 'p')) {
  	  file <- paste('~/babymama/babymamahist/csv/t', yr, '_1gram.csv', sep = '')
  	  yrGramDat <- read.csv(file)
  	  count <- yrGramDat$X2[yrGramDat$X == phrase[1]]
    } else {
  	  # 2- 3- or 4-gram
  	  file <- paste(
  	    '~/babymama/babymamahist/csv/t', year, '_', type, 'gram.csv', sep = '')
	  yrGramDat <- read.csv(file)
	
	  if (type == 2) {
	    count <- yrGramDat[
		  which(yrGramDat[, 1] == phrase[1] & yrGramDat[, 2] == phrase[2]), 3]
	  } else if (type == 3) {
		count <- yrGramDat[
		  which(
		    yrGramDat[, 1] == phrase[1] & 
		    yrGramDat[, 2] == phrase[2] &
		    yrGramDat[, 3] == phrase[3]), 4]
		
	  } else if (type == 4) {
	    count <- yrGramDat[
		  which(
		    yrGramDat[, 1] == phrase[1] & 
		    yrGramDat[, 2] == phrase[2] &
		    yrGramDat[, 3] == phrase[3] &
		    yrGramDat[, 4] == phrase[4]), 5]
	  }

    }
 
    if (length(count) == 0) {
      count <- 0
    }
  
    bmData[i, bmCol] <- count
 
  }
}

head(bmData)

write.csv(bmData, '~/babymama/babymamahist/csv/bmData.csv')
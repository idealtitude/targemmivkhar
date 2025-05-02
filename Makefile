.PHONY: all css watch

all: css

css:
	stylus ./res/options.styl -o ./targem/options.css

watch:
	stylus -w ./res/options.styl -o ./targem/options.css

